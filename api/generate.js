/**
 * DigitalOcean Serverless Function for Replicate API
 * Proxies requests to avoid CORS issues
 */

import Replicate from 'replicate';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { vibe } = req.body;

    if (!vibe || typeof vibe !== 'string' || !vibe.trim()) {
      return res.status(400).json({ error: 'Vibe description is required' });
    }

    // Initialize Replicate with API token from environment
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Call MusicGen-Chord
    const output = await replicate.run(
      'sakemin/musicgen-chord:latest',
      {
        input: {
          prompt: `Generate chord progression for: ${vibe}. Output as text chord notation.`,
          duration: 30,
          temperature: 0.8,
          chord_format: 'text',
        },
      }
    );

    return res.status(200).json({
      output,
      status: 'succeeded',
    });
  } catch (error) {
    console.error('Replicate API error:', error);
    return res.status(500).json({
      error: 'Failed to generate chords',
      message: error.message,
    });
  }
}
