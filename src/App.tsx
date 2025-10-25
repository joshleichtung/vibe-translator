/**
 * Main Application - Pastel Horror Vibe-Based Music Generation
 * Epic 2: Complete integration of vibe input, chord generation, and display
 */

import { useState } from 'react';
import { VibeInputForm } from '@/components/VibeInputForm';
import { ChordProgressionDisplay } from '@/components/ChordProgressionDisplay';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { generateChords } from '@/lib/musicgenServerless';
import { parseMusicGenResponse } from '@/lib/parser';
import type { ChordProgression } from '@/types/music';
import type { ChordGenerationError } from '@/types/musicgen';

/**
 * Map error codes to user-friendly messages
 */
function getErrorMessage(error: unknown): string {
  // Check if it's a ChordGenerationError
  if (error && typeof error === 'object' && 'code' in error) {
    const chordError = error as ChordGenerationError;

    switch (chordError.code) {
      case 'TIMEOUT':
        return 'Generation took too long. Please try again.';
      case 'NETWORK_ERROR':
        return 'Connection issue. Check your internet and try again.';
      case 'API_ERROR':
        return 'Something went wrong with the AI. Please try again.';
      case 'INVALID_RESPONSE':
        return 'Received unexpected data. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  // Fallback for unknown errors
  return 'An unexpected error occurred. Please try again.';
}

function App() {
  const [progression, setProgression] = useState<ChordProgression | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentVibe, setCurrentVibe] = useState('');

  /**
   * Handle vibe submission and chord generation
   */
  const handleVibeSubmit = async (vibe: string) => {
    // Clear previous state
    setError(null);
    setProgression(null);
    setIsLoading(true);
    setCurrentVibe(vibe);

    try {
      // Call MusicGen-Chord API
      const response = await generateChords(vibe);

      // Parse response into ChordProgression
      const parsedProgression = parseMusicGenResponse(response);

      // Validate that we got chords
      if (!parsedProgression.chords.length) {
        throw {
          code: 'INVALID_RESPONSE',
          message: 'No chords generated'
        } as ChordGenerationError;
      }

      // Success - update state
      setProgression(parsedProgression);
    } catch (err) {
      // Error - show user-friendly message
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Chord generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Retry with the same vibe
   */
  const handleRetry = () => {
    if (currentVibe) {
      handleVibeSubmit(currentVibe);
    }
  };

  return (
    <div className="min-h-screen bg-horror-butter p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-horror-charcoal tracking-wide">
            Pastel Horror Vibes
          </h1>
          <p className="text-horror-shadow text-lg">
            Describe your vibe, get AI-generated chords
          </p>
        </header>

        {/* Input Form - Always visible */}
        <VibeInputForm onSubmit={handleVibeSubmit} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        )}

        {/* Success State - Chord Progression Display */}
        {progression && !isLoading && !error && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-horror-charcoal mb-2">
                Your Chord Progression
              </h2>
              <p className="text-horror-shadow text-sm italic">
                "{currentVibe}"
              </p>
            </div>
            <ChordProgressionDisplay progression={progression} />
          </div>
        )}

        {/* Empty State - First visit */}
        {!progression && !isLoading && !error && (
          <div className="text-center py-12 text-horror-shadow">
            <p className="text-lg">
              Enter a vibe above to generate your chord progression
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
