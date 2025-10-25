/**
 * ChordProgressionDisplay - Display AI-generated chord progressions
 * Story 2.5: Display Generated Chord Progression to User
 */

import type { Chord, ChordProgression } from '@/types/music';

interface ChordProgressionDisplayProps {
  progression: ChordProgression;
}

/**
 * Format a single chord for display
 * @param chord - Chord object with root, type, and duration
 * @returns Formatted string like "C major" or "G minor7"
 */
function formatChord(chord: Chord): string {
  return `${chord.root} ${chord.type}`;
}

/**
 * Display chord progression with pastel horror styling
 *
 * Features:
 * - Arrow separator (→) between chords
 * - Monospace font for technical aesthetic
 * - Responsive layout (wraps on mobile)
 * - Returns null if no chords
 */
export function ChordProgressionDisplay({ progression }: ChordProgressionDisplayProps) {
  // Handle empty chord arrays
  if (!progression.chords.length) {
    return null;
  }

  // Format chords with arrow separator
  const chordString = progression.chords
    .map(formatChord)
    .join(' → ');

  return (
    <div className="p-6 rounded-lg bg-horror-lavender/30 border-2 border-horror-lavender space-y-4">
      {/* Chord Sequence */}
      <div className="font-mono text-lg text-horror-charcoal flex flex-wrap gap-2 items-center leading-relaxed">
        {chordString}
      </div>

      {/* Tempo Display */}
      <div className="font-mono text-sm text-horror-shadow tracking-wider">
        {progression.tempo} BPM
      </div>
    </div>
  );
}
