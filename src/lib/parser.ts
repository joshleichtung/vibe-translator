/**
 * MusicGen-Chord response parser
 * Converts API responses to structured musical data
 */

import type { Chord, ChordProgression, ChordRoot, ChordType } from '../types/music';
import type { MusicGenChordResponse } from '../types/musicgen';
import { ChordRoot as ChordRootEnum, ChordType as ChordTypeEnum } from '../types/music';

/**
 * Regex pattern for ROOT:TYPE chord notation
 * Captures: [A-G][#b]? (root) and \w+ (type)
 */
const CHORD_REGEX = /([A-G][#b]?):(\w+)/g;

/**
 * Chord type aliases mapping common notations to canonical types
 */
const CHORD_TYPE_ALIASES: Record<string, ChordType> = {
  'maj': ChordTypeEnum.Major,
  'major': ChordTypeEnum.Major,
  'min': ChordTypeEnum.Minor,
  'minor': ChordTypeEnum.Minor,
  'm': ChordTypeEnum.Minor,
  'dim': ChordTypeEnum.Diminished,
  'aug': ChordTypeEnum.Augmented,
  'maj7': ChordTypeEnum.Major7,
  'min7': ChordTypeEnum.Minor7,
  'm7': ChordTypeEnum.Minor7,
  'dom7': ChordTypeEnum.Dominant7,
  '7': ChordTypeEnum.Dominant7,
  'sus2': ChordTypeEnum.Sus2,
  'sus4': ChordTypeEnum.Sus4,
};

/**
 * Parses a single chord notation string (e.g., "C:maj", "G:min7")
 *
 * @param notation - Chord notation string in ROOT:TYPE format
 * @returns Parsed Chord object or null if invalid
 *
 * @example
 * parseChordNotation('C:maj') // { root: 'C', type: 'major', duration: 4 }
 * parseChordNotation('G:min7') // { root: 'G', type: 'minor7', duration: 4 }
 * parseChordNotation('X:maj') // null (invalid root)
 */
export function parseChordNotation(notation: string): Chord | null {
  const matches = [...notation.matchAll(CHORD_REGEX)];

  if (matches.length === 0) {
    return null;
  }

  const [, root, typeStr] = matches[0];

  // Normalize chord type alias
  const type = CHORD_TYPE_ALIASES[typeStr.toLowerCase()];

  // Validate root and type
  if (!type || !Object.values(ChordRootEnum).includes(root as ChordRoot)) {
    console.warn(`Invalid chord notation: ${notation}`);
    return null;
  }

  return {
    root: root as ChordRoot,
    type,
    duration: 4, // Default to whole note (4 beats)
  };
}

/**
 * Parses MusicGen-Chord API response into structured ChordProgression
 *
 * @param response - MusicGen-Chord API response object
 * @returns Parsed ChordProgression with chords, tempo, and time signature
 *
 * @example
 * parseMusicGenResponse({
 *   output: 'C:maj G:min D:7 F:major',
 *   status: 'succeeded'
 * })
 * // Returns: { chords: [...], tempo: 120, timeSignature: [4, 4] }
 */
export function parseMusicGenResponse(
  response: MusicGenChordResponse
): ChordProgression {
  // Handle both string and array output formats
  const outputText = Array.isArray(response.output)
    ? response.output.join(' ')
    : response.output;

  // Extract all chord notations from output
  const chordMatches = outputText.match(CHORD_REGEX) || [];

  // Parse and filter valid chords
  const chords = chordMatches
    .map(parseChordNotation)
    .filter((chord): chord is Chord => chord !== null);

  // Default to 120 BPM if not specified in response
  const tempo = 120;

  return {
    chords,
    tempo,
    timeSignature: [4, 4], // Default to 4/4 time
  };
}
