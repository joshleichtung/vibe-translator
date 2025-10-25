/**
 * Type definitions for MusicGen-Chord API integration
 */

export interface MusicGenChordInput {
  prompt: string;
  duration?: number;
  temperature?: number;
  top_k?: number;
  top_p?: number;
  chord_format?: 'text' | 'json';
}

export interface MusicGenChordResponse {
  output: string | string[];
  status: 'succeeded' | 'failed' | 'processing';
  error?: string;
}

export interface ChordGenerationError {
  code: 'NETWORK_ERROR' | 'API_ERROR' | 'TIMEOUT' | 'INVALID_RESPONSE';
  message: string;
  originalError?: unknown;
}
