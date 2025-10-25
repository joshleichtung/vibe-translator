/**
 * Musical data types for Vibe Translator Machine
 */

/**
 * Individual chord representation
 */
export interface Chord {
  /** Root note (e.g., "C", "G", "Am") */
  root: string;
  /** Chord quality/type (e.g., "major", "minor7", "dim") */
  type: string;
  /** Duration in beats */
  duration: number;
}

/**
 * Complete chord progression with tempo
 */
export interface ChordProgression {
  /** Array of chords in sequence */
  chords: Chord[];
  /** Tempo in beats per minute */
  tempo: number;
}
