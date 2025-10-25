import Replicate from 'replicate';

const apiToken = import.meta.env.VITE_REPLICATE_API_TOKEN;

if (!apiToken) {
  throw new Error('Missing VITE_REPLICATE_API_TOKEN environment variable');
}

export const replicateClient = new Replicate({
  auth: apiToken,
});

// Type definitions for API responses
export interface MusicGenChordResponse {
  output: string | string[];
  status: 'succeeded' | 'failed' | 'processing';
}

export interface MusicGenChordInput {
  prompt: string;
  duration?: number;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
