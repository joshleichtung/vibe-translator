/**
 * Parser unit tests
 * Testing chord notation parsing and MusicGen response handling
 */

import { describe, it, expect } from 'vitest';
import { parseChordNotation, parseMusicGenResponse } from '../parser';
import { ChordRoot, ChordType } from '../../types/music';
import type { MusicGenChordResponse } from '../../types/musicgen';

describe('parseChordNotation', () => {
  describe('valid chord parsing', () => {
    it('parses major chord with maj alias', () => {
      const chord = parseChordNotation('C:maj');
      expect(chord).toEqual({
        root: ChordRoot.C,
        type: ChordType.Major,
        duration: 4,
      });
    });

    it('parses major chord with major alias', () => {
      const chord = parseChordNotation('D:major');
      expect(chord).toEqual({
        root: ChordRoot.D,
        type: ChordType.Major,
        duration: 4,
      });
    });

    it('parses minor chord with min alias', () => {
      const chord = parseChordNotation('G:min');
      expect(chord).toEqual({
        root: ChordRoot.G,
        type: ChordType.Minor,
        duration: 4,
      });
    });

    it('parses minor chord with m alias', () => {
      const chord = parseChordNotation('A:m');
      expect(chord).toEqual({
        root: ChordRoot.A,
        type: ChordType.Minor,
        duration: 4,
      });
    });

    it('parses minor7 chord with min7 alias', () => {
      const chord = parseChordNotation('E:min7');
      expect(chord).toEqual({
        root: ChordRoot.E,
        type: ChordType.Minor7,
        duration: 4,
      });
    });

    it('parses minor7 chord with m7 alias', () => {
      const chord = parseChordNotation('B:m7');
      expect(chord).toEqual({
        root: ChordRoot.B,
        type: ChordType.Minor7,
        duration: 4,
      });
    });

    it('parses dominant7 chord with 7 alias', () => {
      const chord = parseChordNotation('D:7');
      expect(chord).toEqual({
        root: ChordRoot.D,
        type: ChordType.Dominant7,
        duration: 4,
      });
    });

    it('parses diminished chord', () => {
      const chord = parseChordNotation('F:dim');
      expect(chord).toEqual({
        root: ChordRoot.F,
        type: ChordType.Diminished,
        duration: 4,
      });
    });

    it('parses augmented chord', () => {
      const chord = parseChordNotation('C:aug');
      expect(chord).toEqual({
        root: ChordRoot.C,
        type: ChordType.Augmented,
        duration: 4,
      });
    });

    it('parses sus2 chord', () => {
      const chord = parseChordNotation('G:sus2');
      expect(chord).toEqual({
        root: ChordRoot.G,
        type: ChordType.Sus2,
        duration: 4,
      });
    });

    it('parses sus4 chord', () => {
      const chord = parseChordNotation('A:sus4');
      expect(chord).toEqual({
        root: ChordRoot.A,
        type: ChordType.Sus4,
        duration: 4,
      });
    });
  });

  describe('sharp and flat notation', () => {
    it('parses sharp root notes', () => {
      const chord = parseChordNotation('C#:maj');
      expect(chord).toEqual({
        root: ChordRoot.Cs,
        type: ChordType.Major,
        duration: 4,
      });
    });

    it('parses flat root notes', () => {
      const chord = parseChordNotation('Db:min');
      expect(chord).toEqual({
        root: ChordRoot.Db,
        type: ChordType.Minor,
        duration: 4,
      });
    });

    it('parses F# major7', () => {
      const chord = parseChordNotation('F#:maj7');
      expect(chord).toEqual({
        root: ChordRoot.Fs,
        type: ChordType.Major7,
        duration: 4,
      });
    });

    it('parses Bb minor7', () => {
      const chord = parseChordNotation('Bb:m7');
      expect(chord).toEqual({
        root: ChordRoot.Bb,
        type: ChordType.Minor7,
        duration: 4,
      });
    });
  });

  describe('invalid chord filtering', () => {
    it('returns null for invalid root note', () => {
      const chord = parseChordNotation('X:maj');
      expect(chord).toBeNull();
    });

    it('returns null for invalid chord type', () => {
      const chord = parseChordNotation('C:xyz');
      expect(chord).toBeNull();
    });

    it('returns null for malformed notation (no colon)', () => {
      const chord = parseChordNotation('Cmaj');
      expect(chord).toBeNull();
    });

    it('returns null for empty string', () => {
      const chord = parseChordNotation('');
      expect(chord).toBeNull();
    });

    it('returns null for invalid format', () => {
      const chord = parseChordNotation('invalid');
      expect(chord).toBeNull();
    });
  });

  describe('case insensitivity', () => {
    it('handles uppercase chord type', () => {
      const chord = parseChordNotation('C:MAJ');
      expect(chord).toEqual({
        root: ChordRoot.C,
        type: ChordType.Major,
        duration: 4,
      });
    });

    it('handles mixed case chord type', () => {
      const chord = parseChordNotation('D:MiN7');
      expect(chord).toEqual({
        root: ChordRoot.D,
        type: ChordType.Minor7,
        duration: 4,
      });
    });
  });
});

describe('parseMusicGenResponse', () => {
  describe('valid response parsing', () => {
    it('parses simple chord progression', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj G:min D:7 F:major',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(4);
      expect(progression.tempo).toBe(120);
      expect(progression.timeSignature).toEqual([4, 4]);
      expect(progression.chords[0]).toEqual({
        root: ChordRoot.C,
        type: ChordType.Major,
        duration: 4,
      });
      expect(progression.chords[1]).toEqual({
        root: ChordRoot.G,
        type: ChordType.Minor,
        duration: 4,
      });
      expect(progression.chords[2]).toEqual({
        root: ChordRoot.D,
        type: ChordType.Dominant7,
        duration: 4,
      });
      expect(progression.chords[3]).toEqual({
        root: ChordRoot.F,
        type: ChordType.Major,
        duration: 4,
      });
    });

    it('parses array output format', () => {
      const response: MusicGenChordResponse = {
        output: ['C:maj', 'G:min', 'D:7'],
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(3);
      expect(progression.chords[0].root).toBe(ChordRoot.C);
      expect(progression.chords[1].root).toBe(ChordRoot.G);
      expect(progression.chords[2].root).toBe(ChordRoot.D);
    });

    it('parses progression with sharp and flat notes', () => {
      const response: MusicGenChordResponse = {
        output: 'C#:maj Bb:m7 F#:dim',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(3);
      expect(progression.chords[0].root).toBe(ChordRoot.Cs);
      expect(progression.chords[1].root).toBe(ChordRoot.Bb);
      expect(progression.chords[2].root).toBe(ChordRoot.Fs);
    });
  });

  describe('mixed valid/invalid chords', () => {
    it('filters invalid chords and keeps valid ones', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj X:invalid G:min Y:bad D:7',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(3);
      expect(progression.chords[0].root).toBe(ChordRoot.C);
      expect(progression.chords[1].root).toBe(ChordRoot.G);
      expect(progression.chords[2].root).toBe(ChordRoot.D);
    });

    it('handles all invalid chords gracefully', () => {
      const response: MusicGenChordResponse = {
        output: 'X:invalid Y:bad Z:wrong',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(0);
      expect(progression.tempo).toBe(120);
    });
  });

  describe('missing/malformed data handling', () => {
    it('handles empty output string', () => {
      const response: MusicGenChordResponse = {
        output: '',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(0);
      expect(progression.tempo).toBe(120);
      expect(progression.timeSignature).toEqual([4, 4]);
    });

    it('handles empty output array', () => {
      const response: MusicGenChordResponse = {
        output: [],
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(0);
      expect(progression.tempo).toBe(120);
    });

    it('handles output with no chord notations', () => {
      const response: MusicGenChordResponse = {
        output: 'This text has no chords',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(0);
      expect(progression.tempo).toBe(120);
    });

    it('defaults tempo to 120 BPM', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj G:min',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.tempo).toBe(120);
    });

    it('defaults time signature to 4/4', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj G:min',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.timeSignature).toEqual([4, 4]);
    });
  });

  describe('chord type normalization', () => {
    it('normalizes maj to major', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords[0].type).toBe(ChordType.Major);
    });

    it('normalizes min to minor', () => {
      const response: MusicGenChordResponse = {
        output: 'C:min',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords[0].type).toBe(ChordType.Minor);
    });

    it('normalizes m to minor', () => {
      const response: MusicGenChordResponse = {
        output: 'C:m',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords[0].type).toBe(ChordType.Minor);
    });

    it('normalizes m7 to minor7', () => {
      const response: MusicGenChordResponse = {
        output: 'C:m7',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords[0].type).toBe(ChordType.Minor7);
    });

    it('normalizes 7 to dominant7', () => {
      const response: MusicGenChordResponse = {
        output: 'C:7',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords[0].type).toBe(ChordType.Dominant7);
    });
  });

  describe('complex real-world scenarios', () => {
    it('parses jazz progression with various chord types', () => {
      const response: MusicGenChordResponse = {
        output: 'C:maj7 A:m7 D:7 G:maj',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(4);
      expect(progression.chords[0].type).toBe(ChordType.Major7);
      expect(progression.chords[1].type).toBe(ChordType.Minor7);
      expect(progression.chords[2].type).toBe(ChordType.Dominant7);
      expect(progression.chords[3].type).toBe(ChordType.Major);
    });

    it('parses output with mixed text and chord notations', () => {
      const response: MusicGenChordResponse = {
        output: 'Here are some chords: C:maj G:min and also D:7 with text',
        status: 'succeeded',
      };

      const progression = parseMusicGenResponse(response);

      expect(progression.chords).toHaveLength(3);
      expect(progression.chords[0].root).toBe(ChordRoot.C);
      expect(progression.chords[1].root).toBe(ChordRoot.G);
      expect(progression.chords[2].root).toBe(ChordRoot.D);
    });
  });
});
