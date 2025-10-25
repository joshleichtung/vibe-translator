# Vibe Translator Machine

AI-powered music generation from emotional vibes for the Dumb Things AI Hackathon.

**🌐 Live Demo**: https://vibe-translator-wjdf5.ondigitalocean.app/

## Description

The Vibe Translator Machine takes emotional or situational descriptions and translates them into playable music using Replicate's MusicGen-Chord AI model. It combines AI-generated chord progressions with Tone.js synthesis for an interactive jamming experience.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your VITE_REPLICATE_API_TOKEN
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   App runs on http://localhost:8420

## Scripts

- `npm run dev` - Start development server (port 8420)
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript validation
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

- Vite v7.0.0
- React v18.3.0
- TypeScript v5.6.0
- Tone.js (audio synthesis)
- shadcn/ui + Tailwind CSS (UI)
- Replicate API (AI music generation)

## License

MIT
