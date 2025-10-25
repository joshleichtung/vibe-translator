/**
 * Musical data types for Vibe Translator Machine
 */

/**
 * Valid chord root notes (chromatic scale)
 */
export enum ChordRoot {
  C = 'C',
  Cs = 'C#',
  Db = 'Db',
  D = 'D',
  Ds = 'D#',
  Eb = 'Eb',
  E = 'E',
  F = 'F',
  Fs = 'F#',
  Gb = 'Gb',
  G = 'G',
  Gs = 'G#',
  Ab = 'Ab',
  A = 'A',
  As = 'A#',
  Bb = 'Bb',
  B = 'B',
}

/**
 * Valid chord types/qualities
 */
export enum ChordType {
  Major = 'major',
  Minor = 'minor',
  Diminished = 'diminished',
  Augmented = 'augmented',
  Major7 = 'major7',
  Minor7 = 'minor7',
  Dominant7 = 'dominant7',
  Sus2 = 'sus2',
  Sus4 = 'sus4',
}

/**
 * Individual chord representation
 */
export interface Chord {
  /** Root note (e.g., "C", "G", "F#") */
  root: ChordRoot;
  /** Chord quality/type (e.g., "major", "minor7", "dim") */
  type: ChordType;
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
  /** Time signature [numerator, denominator] (e.g., [4, 4]) */
  timeSignature: [number, number];
}
