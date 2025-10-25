/**
 * MusicGen-Chord API integration
 * Handles AI-generated chord progression requests via Replicate
 */

import { replicateClient } from './replicate';
import type {
  MusicGenChordInput,
  MusicGenChordResponse,
  ChordGenerationError
} from '../types/musicgen';

const MUSICGEN_CHORD_MODEL = 'sakemin/musicgen-chord:latest';
const REQUEST_TIMEOUT_MS = 90000; // 90 seconds

/**
 * Generate chord progression from vibe description
 *
 * @param vibe - Natural language description of musical mood/style
 * @returns Promise with chord progression data
 * @throws ChordGenerationError on timeout, network, or API failures
 *
 * @example
 * const result = await generateChords("happy summer day");
 * console.log(result.output); // Chord notation string
 */
export async function generateChords(
  vibe: string
): Promise<MusicGenChordResponse> {
  if (!vibe.trim()) {
    throw new Error('Vibe description cannot be empty');
  }

  const input: MusicGenChordInput = {
    prompt: `Generate chord progression for: ${vibe}. Output as text chord notation.`,
    duration: 30,
    temperature: 0.8,
    chord_format: 'text',
  };

  try {
    const output = await Promise.race([
      replicateClient.run(MUSICGEN_CHORD_MODEL, { input }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT_MS)
      ),
    ]);

    return {
      output: output as string | string[],
      status: 'succeeded',
    };
  } catch (error) {
    const chordError: ChordGenerationError = {
      code: error instanceof Error && error.message === 'Request timeout'
        ? 'TIMEOUT'
        : error instanceof Error && error.message.includes('network')
        ? 'NETWORK_ERROR'
        : 'API_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      originalError: error,
    };

    console.error('MusicGen-Chord API error:', chordError);
    throw chordError;
  }
}
