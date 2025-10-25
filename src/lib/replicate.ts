import Replicate from 'replicate';

const apiToken = import.meta.env.VITE_REPLICATE_API_TOKEN;

if (!apiToken) {
  throw new Error('Missing VITE_REPLICATE_API_TOKEN environment variable');
}

export const replicateClient = new Replicate({
  auth: apiToken,
});
