import type { MusicGenChordResponse, ChordGenerationError } from '@/types/musicgen';

const REQUEST_TIMEOUT_MS = 90000; // 90 seconds

/**
 * Generates chord progression using DigitalOcean serverless function
 * This avoids CORS issues by proxying through our backend
 */
export async function generateChords(vibe: string): Promise<MusicGenChordResponse> {
  if (!vibe.trim()) {
    throw new Error('Vibe description cannot be empty');
  }

  // Determine API endpoint based on environment
  const apiUrl = import.meta.env.PROD
    ? '/api/generate' // Production: DigitalOcean serverless function
    : 'http://localhost:3000/api/generate'; // Development: local serverless function

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vibe }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: MusicGenChordResponse = await response.json();

    return {
      output: data.output,
      status: 'succeeded',
    };
  } catch (error) {
    const chordError: ChordGenerationError = {
      code: error instanceof Error && error.name === 'AbortError'
        ? 'TIMEOUT'
        : error instanceof Error && error.message.includes('fetch')
        ? 'NETWORK_ERROR'
        : 'API_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      originalError: error,
    };

    console.error('MusicGen-Chord API error:', chordError);
    throw chordError;
  }
}
