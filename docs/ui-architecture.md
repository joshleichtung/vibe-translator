# Vibe Translator Machine - Frontend Architecture Document

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-25 | 0.1 | Initial frontend architecture for hackathon project | Winston (Architect) |

---

## Template and Framework Selection

### Framework Decision

**Selected Stack**: Vite + React + TypeScript

**Rationale**:
- **Vite**: Lightning-fast HMR (<50ms), <30s builds, zero-config TypeScript support
- **React**: Industry standard, excellent Web Audio API integration patterns, vast ecosystem
- **TypeScript**: Critical for music theory types (chords, notes, scales), API contracts, audio routing

**No Starter Template**: Building from scratch using `npm create vite@latest` with TypeScript + React template. This gives us maximum control and minimal bloat for the 5-hour hackathon timeline.

### Key Constraints from PRD

1. **Port Configuration**: Dev server on 8420, HMR on 8421 (avoid conflicts with simultaneous project)
2. **Pastel Horror Aesthetic**: Custom Tailwind theme with specific color palette (no purple AI slop)
3. **Client-Side Only**: No backend - all API calls direct from browser to Replicate
4. **Progressive Validation**: TypeScript strict mode, ESLint pre-commit, Playwright E2E
5. **Build Speed**: Must build in <30 seconds for rapid iteration

---

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| **Framework** | React | ^18.3.0 | UI component library | Industry standard, excellent hooks for audio state management, rich ecosystem for music apps |
| **Build Tool** | Vite | ^7.0.0 | Dev server and bundler | Fastest builds (<30s), instant HMR, zero-config TypeScript, perfect for hackathons |
| **Language** | TypeScript | ^5.6.0 | Type-safe development | Critical for music theory types, API contracts, prevents audio routing bugs |
| **UI Library** | shadcn/ui | latest | Pre-built accessible components | Copy-paste components, Tailwind-based, pastel horror theme customization |
| **Styling** | Tailwind CSS | ^3.4.0 | Utility-first CSS | Rapid styling, pastel horror theme via config, Context7 docs prevent version mismatches |
| **State Management** | React Hooks | - | Local component state | useState, useContext, useReducer sufficient for hackathon scope, no Redux overhead |
| **Audio Synthesis** | Tone.js | ^15.0.0 | Web Audio framework | Industry-standard music synthesis, transport/scheduling, effects DSL |
| **Music Theory** | Tonal.js | ^6.0.0 | Chord parsing and transposition | Converts chord notation to note arrays, handles music theory calculations |
| **Visualization** | Wavesurfer.js | ^7.0.0 | Audio waveform display | Real-time waveform rendering, pastel horror color customization |
| **Animation** | Framer Motion | ^11.0.0 | UI animations | Smooth transitions, beat-sync animations, pastel horror timing effects |
| **API Client** | Replicate SDK | ^0.32.0 | MusicGen-Chord API | Official SDK for Replicate, handles streaming and polling |
| **Testing** | Playwright | ^1.47.0 | E2E browser testing | Real browser audio testing, MCP integration for Claude Code, validates critical flows |
| **Linting** | ESLint | ^9.0.0 | Code quality | TypeScript-aware rules, pre-commit validation |
| **Git Hooks** | Husky | ^9.0.0 | Pre-commit validation | Runs typecheck + lint before commits, <5s execution |
| **Component Extras** | vaul | latest | Drawer component | DJ effects panel drawer (from awesome-shadcn-ui) |
| **Component Extras** | number-flow | latest | Smooth number transitions | Tempo/BPM display animations |
| **Component Extras** | tremor | latest | Data visualization | Charts if time permits (optional) |

---

## Project Structure

```plaintext
aimusic/
├── .bmad-core/              # BMAD framework files
├── .claude/                 # Claude Code commands and skills
├── docs/                    # Documentation
│   ├── prd.md              # Product Requirements Document
│   └── ui-architecture.md  # This document
├── public/                  # Static assets
│   └── vite.svg            # Vite logo (replace with branding)
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── progress.tsx
│   │   │   └── drawer.tsx
│   │   ├── VibeInput.tsx   # Vibe description input form
│   │   ├── ChordDisplay.tsx # Generated chord progression display
│   │   ├── AudioControls.tsx # Play/pause/stop/volume
│   │   ├── Minichord.tsx   # Jamming interface
│   │   ├── EffectsPanel.tsx # DJ effects controls (reverb, delay, etc.)
│   │   ├── Waveform.tsx    # Wavesurfer visualization
│   │   └── LoadingState.tsx # Pastel horror loading animation
│   ├── lib/                 # Utilities and core logic
│   │   ├── utils.ts        # shadcn/ui utils (cn helper)
│   │   ├── audio/          # Audio engine
│   │   │   ├── tone-setup.ts # Tone.js initialization
│   │   │   ├── instruments.ts # Virtual band synthesizers
│   │   │   ├── effects.ts   # Audio effects chain
│   │   │   └── sequencer.ts # Chord progression playback
│   │   ├── music/          # Music theory
│   │   │   ├── chord-parser.ts # Parse API chords to notes
│   │   │   ├── types.ts     # Musical data types
│   │   │   └── minichord-layout.ts # Chord button grid
│   │   └── api/            # API integration
│   │       ├── replicate.ts # Replicate SDK wrapper
│   │       └── types.ts     # API request/response types
│   ├── hooks/              # Custom React hooks
│   │   ├── useAudioEngine.ts # Tone.js state management
│   │   ├── useReplicate.ts  # API call hook
│   │   └── useKeyboard.ts   # Keyboard shortcuts
│   ├── types/              # TypeScript definitions
│   │   ├── audio.ts        # Audio state types
│   │   └── music.ts        # Chord, Note, Progression types
│   ├── App.tsx             # Root component (single-page)
│   ├── App.css             # Component-specific styles
│   ├── index.css           # Global styles + Tailwind directives
│   ├── main.tsx            # React entry point
│   └── vite-env.d.ts       # Vite type definitions
├── tests/
│   └── e2e/                # Playwright E2E tests
│       ├── smoke.spec.ts   # App loads test
│       ├── generation.spec.ts # Vibe → music flow
│       └── audio.spec.ts    # Playback and effects
├── .env                    # Environment variables (gitignored)
├── .env.example            # Example env vars (committed)
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── playwright.config.ts    # Playwright configuration
├── postcss.config.js       # PostCSS for Tailwind
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind + pastel horror theme
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript for Vite config
└── vite.config.ts          # Vite configuration (port 8420)
```

---

## Component Standards

### Component Template

```typescript
import { FC } from 'react'

interface ComponentNameProps {
  // Props interface
  className?: string
}

/**
 * ComponentName
 *
 * Description of what this component does.
 *
 * @param props - Component props
 */
export const ComponentName: FC<ComponentNameProps> = ({ className }) => {
  // Component logic here

  return (
    <div className={className}>
      {/* Component JSX */}
    </div>
  )
}
```

**Detailed Template with State and Effects**:

```typescript
import { FC, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface AudioControlsProps {
  onPlay?: () => void
  onPause?: () => void
  onStop?: () => void
  isPlaying?: boolean
  className?: string
}

/**
 * AudioControls
 *
 * Play/pause/stop transport controls for audio playback.
 * Styled with pastel horror aesthetic.
 *
 * @param props - Audio control props
 */
export const AudioControls: FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onStop,
  isPlaying = false,
  className,
}) => {
  const [volume, setVolume] = useState(-12) // dB

  useEffect(() => {
    // Side effects here
  }, [isPlaying])

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.()
    } else {
      onPlay?.()
    }
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <button
        onClick={handlePlayPause}
        className="bg-horror-mint hover:bg-horror-glow transition-colors"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={onStop} className="bg-horror-coral">
        Stop
      </button>
    </div>
  )
}
```

### Naming Conventions

**Files**:
- Components: `PascalCase.tsx` (e.g., `VibeInput.tsx`, `EffectsPanel.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useAudioEngine.ts`)
- Utilities: `kebab-case.ts` (e.g., `chord-parser.ts`, `tone-setup.ts`)
- Types: `camelCase.ts` (e.g., `audio.ts`, `music.ts`)
- Tests: `*.spec.ts` (e.g., `generation.spec.ts`)

**Components**:
- React components: `PascalCase` (e.g., `AudioControls`, `Minichord`)
- shadcn/ui components: `lowercase` folder, `PascalCase` export (e.g., `ui/button.tsx` exports `Button`)

**Variables and Functions**:
- Variables: `camelCase` (e.g., `isPlaying`, `chordProgression`)
- Functions: `camelCase` (e.g., `handlePlayPause`, `parseChordData`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_TEMPO`, `MAX_VOLUME_DB`)
- Types/Interfaces: `PascalCase` (e.g., `ChordData`, `AudioState`)

**CSS Classes** (Tailwind):
- Use utility classes: `bg-horror-mint`, `text-horror-charcoal`
- Custom classes (if needed): `kebab-case` (e.g., `pastel-horror-glow`)

---

## State Management

### Store Structure

**No Global State Library**: Using React hooks for state management due to hackathon scope and simple data flow.

**State Organization**:

```plaintext
src/
├── hooks/
│   ├── useAudioEngine.ts    # Tone.js audio state
│   ├── useReplicate.ts      # API call state
│   └── useKeyboard.ts       # Keyboard shortcut state
└── App.tsx                   # Root state container
```

**State Location Principles**:
1. **Component State**: UI state local to one component (useState)
2. **Shared State**: Lifted to nearest common ancestor
3. **Audio State**: Centralized in `useAudioEngine` hook
4. **API State**: Encapsulated in `useReplicate` hook

### State Management Template

**Audio Engine Hook**:

```typescript
import { useState, useEffect, useCallback } from 'react'
import * as Tone from 'tone'
import type { ChordData } from '@/types/music'

interface AudioEngineState {
  isPlaying: boolean
  isLoading: boolean
  volume: number
  tempo: number
  currentChord: number
}

interface AudioEngineActions {
  play: () => Promise<void>
  pause: () => void
  stop: () => void
  setVolume: (db: number) => void
  loadProgression: (chords: ChordData[]) => void
}

export const useAudioEngine = (): [AudioEngineState, AudioEngineActions] => {
  const [state, setState] = useState<AudioEngineState>({
    isPlaying: false,
    isLoading: false,
    volume: -12,
    tempo: 120,
    currentChord: 0,
  })

  // Initialize Tone.js on mount
  useEffect(() => {
    const initAudio = async () => {
      await Tone.start()
      Tone.getDestination().volume.value = state.volume
    }
    initAudio()

    return () => {
      // Cleanup on unmount
      Tone.getTransport().stop()
    }
  }, [])

  const play = useCallback(async () => {
    await Tone.start()
    Tone.getTransport().start()
    setState(prev => ({ ...prev, isPlaying: true }))
  }, [])

  const pause = useCallback(() => {
    Tone.getTransport().pause()
    setState(prev => ({ ...prev, isPlaying: false }))
  }, [])

  const stop = useCallback(() => {
    Tone.getTransport().stop()
    setState(prev => ({ ...prev, isPlaying: false, currentChord: 0 }))
  }, [])

  const setVolume = useCallback((db: number) => {
    Tone.getDestination().volume.value = db
    setState(prev => ({ ...prev, volume: db }))
  }, [])

  const loadProgression = useCallback((chords: ChordData[]) => {
    setState(prev => ({ ...prev, isLoading: true }))
    // Load chord progression into Tone.js sequencer
    // Implementation in lib/audio/sequencer.ts
    setState(prev => ({ ...prev, isLoading: false }))
  }, [])

  return [
    state,
    { play, pause, stop, setVolume, loadProgression },
  ]
}
```

**API Hook**:

```typescript
import { useState, useCallback } from 'react'
import { generateMusic } from '@/lib/api/replicate'
import { parseChordData } from '@/lib/music/chord-parser'
import type { ChordData } from '@/types/music'

interface ReplicateState {
  isGenerating: boolean
  error: string | null
  chords: ChordData[] | null
  tempo: number | null
}

interface ReplicateActions {
  generate: (vibe: string) => Promise<void>
  reset: () => void
}

export const useReplicate = (): [ReplicateState, ReplicateActions] => {
  const [state, setState] = useState<ReplicateState>({
    isGenerating: false,
    error: null,
    chords: null,
    tempo: null,
  })

  const generate = useCallback(async (vibe: string) => {
    setState({ isGenerating: true, error: null, chords: null, tempo: null })

    try {
      const response = await generateMusic(vibe)
      const { chords, tempo } = parseChordData(response)

      setState({
        isGenerating: false,
        error: null,
        chords,
        tempo,
      })
    } catch (error) {
      setState({
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Generation failed',
        chords: null,
        tempo: null,
      })
    }
  }, [])

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      error: null,
      chords: null,
      tempo: null,
    })
  }, [])

  return [state, { generate, reset }]
}
```

---

## API Integration

### Service Template

```typescript
import Replicate from 'replicate'
import type { MusicGenChordResponse } from './types'

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN,
})

const MUSICGEN_CHORD_MODEL = 'sakemin/musicgen-chord:latest'
const TIMEOUT_MS = 90000 // 90 seconds (NFR1)

/**
 * Generate music from vibe description using MusicGen-Chord
 *
 * @param vibe - Text description of emotional vibe
 * @returns API response with chord progression and audio
 */
export async function generateMusic(vibe: string): Promise<MusicGenChordResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const output = await replicate.run(
      MUSICGEN_CHORD_MODEL,
      {
        input: {
          prompt: vibe,
          chord_output: 'text', // Get text-based chord notation
          duration: 30, // 30 second generation
        },
        signal: controller.signal,
      }
    )

    clearTimeout(timeoutId)
    return output as MusicGenChordResponse
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Music generation timed out after 90 seconds')
    }

    throw error
  }
}
```

### API Client Configuration

```typescript
// src/lib/api/types.ts
export interface MusicGenChordResponse {
  audio_url: string
  chords: string // Format: "C:maj,G:min7,F:maj,Am:min"
  tempo: number
  key: string
}

export interface ChordData {
  root: string // e.g., "C", "G", "F#"
  type: string // e.g., "maj", "min7", "dim"
  notes: string[] // e.g., ["C4", "E4", "G4"]
  duration: string // e.g., "1m" (1 measure)
}

// Environment variable validation
const REQUIRED_ENV_VARS = ['VITE_REPLICATE_API_TOKEN'] as const

export function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter(
    key => !import.meta.env[key]
  )

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Copy .env.example to .env and fill in the values.'
    )
  }
}
```

---

## Routing

### Route Configuration

**No Routing Library**: Single-page application with state-based view switching. No React Router needed for hackathon scope.

**View States**:

```typescript
// src/types/app.ts
export type AppView = 'input' | 'loading' | 'playback'

export interface AppState {
  view: AppView
  // ... other state
}
```

**View Switching**:

```typescript
// src/App.tsx
import { useState } from 'react'
import { VibeInput } from './components/VibeInput'
import { LoadingState } from './components/LoadingState'
import { PlaybackView } from './components/PlaybackView'

export function App() {
  const [view, setView] = useState<AppView>('input')

  return (
    <div className="min-h-screen bg-horror-butter">
      {view === 'input' && (
        <VibeInput onGenerate={() => setView('loading')} />
      )}
      {view === 'loading' && (
        <LoadingState onComplete={() => setView('playback')} />
      )}
      {view === 'playback' && (
        <PlaybackView onReset={() => setView('input')} />
      )}
    </div>
  )
}
```

**Progressive Disclosure Pattern**: Controls appear/hide based on view state, not routing.

---

## Styling Guidelines

### Styling Approach

**Primary Method**: Tailwind CSS utility classes

**Methodology**:
1. **Utility-First**: Use Tailwind classes for 95% of styling
2. **Component Variants**: shadcn/ui components with pastel horror overrides
3. **Custom Classes**: Only for complex animations or reusable patterns
4. **No CSS Modules**: Avoid additional abstraction for hackathon speed

**Tailwind Usage Patterns**:

```typescript
import { cn } from '@/lib/utils'

// Good: Utility classes with cn() helper
<button className={cn(
  'px-4 py-2 rounded-lg font-mono',
  'bg-horror-mint hover:bg-horror-glow',
  'transition-colors duration-200',
  isActive && 'ring-2 ring-horror-rust',
  className
)}>
  Click Me
</button>

// Avoid: Inline styles (breaks pastel horror theme)
<button style={{ backgroundColor: '#c8f7dc' }}>Bad</button>
```

**Component Styling**:

```typescript
// shadcn/ui component with pastel horror customization
import { Button } from '@/components/ui/button'

<Button
  variant="default"
  className="bg-horror-coral hover:bg-horror-rust"
>
  Generate Vibe
</Button>
```

### Global Theme Variables

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Pastel Horror Color Palette */
    --horror-mint: #c8f7dc;
    --horror-peach: #ffd4c4;
    --horror-lavender: #e8d5ff;
    --horror-butter: #fff4cc;
    --horror-coral: #ffb3b3;
    --horror-rust: #d4a59a;
    --horror-sage: #b4c9a8;
    --horror-slate: #c9d4e0;
    --horror-charcoal: #4a4a52;
    --horror-shadow: #6b6b7a;
    --horror-glow: #d4ffea;
    --horror-warning: #ffc4a3;

    /* Typography */
    --font-mono: 'JetBrains Mono', monospace;
    --font-sans: 'Inter', system-ui, sans-serif;

    /* Spacing (Tailwind defaults, documented for reference) */
    --spacing-unit: 0.25rem; /* 4px */

    /* Shadows (pastel horror - colored, not grey) */
    --shadow-mint: 0 4px 12px rgba(200, 247, 220, 0.3);
    --shadow-peach: 0 4px 12px rgba(255, 212, 196, 0.3);
    --shadow-coral: 0 4px 12px rgba(255, 179, 179, 0.3);

    /* Animations */
    --transition-fast: 150ms;
    --transition-normal: 200ms;
    --transition-slow: 300ms;

    /* VHS Horror Grain (optional overlay) */
    --grain-opacity: 0.03;
  }

  * {
    @apply border-horror-slate;
  }

  body {
    @apply bg-horror-butter text-horror-charcoal font-sans;
    @apply antialiased;
  }

  /* Slightly wide letter spacing for unease */
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: 0.03em;
  }

  /* Monospace for technical data */
  code, kbd, pre, .font-mono {
    font-family: var(--font-mono);
  }
}

@layer components {
  /* Pastel Horror Button Base */
  .btn-horror {
    @apply px-4 py-2 rounded-lg font-sans;
    @apply transition-all duration-200;
    @apply border-2 border-horror-shadow;
    @apply hover:scale-105 active:scale-95;
  }

  /* VHS Grain Overlay (optional) */
  .vhs-grain::before {
    content: '';
    @apply absolute inset-0 pointer-events-none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
}

@layer utilities {
  /* Pastel Horror Glow Effect */
  .glow-horror {
    box-shadow: 0 0 20px var(--horror-glow);
  }

  /* Beat Pulse Animation */
  .beat-pulse {
    animation: beat-pulse 0.5s ease-in-out;
  }

  @keyframes beat-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Chord Change Shift */
  .chord-shift {
    transition: background-color 0.3s ease-out;
  }
}
```

**Tailwind Config with Pastel Horror Theme**:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'horror-mint': '#c8f7dc',
        'horror-peach': '#ffd4c4',
        'horror-lavender': '#e8d5ff',
        'horror-butter': '#fff4cc',
        'horror-coral': '#ffb3b3',
        'horror-rust': '#d4a59a',
        'horror-sage': '#b4c9a8',
        'horror-slate': '#c9d4e0',
        'horror-charcoal': '#4a4a52',
        'horror-shadow': '#6b6b7a',
        'horror-glow': '#d4ffea',
        'horror-warning': '#ffc4a3',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'beat-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'beat-pulse': 'beat-pulse 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

---

## Testing Requirements

### Component Test Template

```typescript
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('app loads and renders vibe input', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/Vibe Translator/)

    // Check vibe input field renders
    const input = page.getByPlaceholder(/rainy Sunday/)
    await expect(input).toBeVisible()

    // Check submit button
    const button = page.getByRole('button', { name: /generate/i })
    await expect(button).toBeVisible()
  })

  test('pastel horror theme applied', async ({ page }) => {
    await page.goto('/')

    // Check background color (horror-butter)
    const body = page.locator('body')
    const bgColor = await body.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).toBeTruthy() // Non-default background
  })
})
```

```typescript
// tests/e2e/generation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Music Generation Flow', () => {
  test('vibe input → loading → playback flow', async ({ page }) => {
    await page.goto('/')

    // Enter vibe
    const input = page.getByPlaceholder(/rainy Sunday/)
    await input.fill('happy coding vibes')

    // Click generate
    const generateBtn = page.getByRole('button', { name: /generate/i })
    await generateBtn.click()

    // Wait for loading state
    await expect(page.getByText(/translating your vibe/i)).toBeVisible()

    // Wait for playback UI (timeout 90s per NFR1)
    await expect(page.getByRole('button', { name: /play/i })).toBeVisible({
      timeout: 95000,
    })

    // Check chord display appears
    await expect(page.getByText(/→/)).toBeVisible() // Chord separator
  })

  test('error handling on API failure', async ({ page }) => {
    // Mock API failure
    await page.route('**/replicate.com/**', route =>
      route.abort('failed')
    )

    await page.goto('/')
    const input = page.getByPlaceholder(/rainy Sunday/)
    await input.fill('test vibe')

    const generateBtn = page.getByRole('button', { name: /generate/i })
    await generateBtn.click()

    // Check error message appears
    await expect(page.getByText(/failed|error|retry/i)).toBeVisible()
  })
})
```

```typescript
// tests/e2e/audio.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Audio Playback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Assume we have a test fixture or mock for quick playback state
  })

  test('play button starts audio context', async ({ page, context }) => {
    // Grant audio permissions
    await context.grantPermissions(['audio-capture'])

    // Navigate to playback state (or use test fixture)
    // ... setup code ...

    const playBtn = page.getByRole('button', { name: /play/i })
    await playBtn.click()

    // Check button state changes
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()
  })

  test('volume slider adjusts audio', async ({ page }) => {
    const volumeSlider = page.getByRole('slider', { name: /volume/i })
    await expect(volumeSlider).toBeVisible()

    // Move slider (test interaction)
    await volumeSlider.fill('50')
    // Volume change verified through Tone.js state (unit test level)
  })

  test('effects toggle on/off', async ({ page }) => {
    const reverbToggle = page.getByRole('button', { name: /reverb/i })
    await reverbToggle.click()

    // Check visual feedback (glow effect)
    await expect(reverbToggle).toHaveClass(/glow-horror/)
  })
})
```

### Testing Best Practices

1. **E2E Tests Only for Hackathon**: Focus Playwright on critical user flows, skip unit tests for speed
2. **Audio Context Permissions**: Grant audio permissions in Playwright config for audio tests
3. **Mock Replicate API**: Use Playwright route mocking for fast, reliable tests
4. **Visual Regression**: Capture screenshots of pastel horror theme for validation
5. **Test Data**: Use consistent test vibes for reproducible results
6. **Timeout Handling**: Set 95s timeout for generation tests (90s API + 5s buffer)
7. **Keyboard Testing**: Verify spacebar play/pause, escape for reset

**Playwright Configuration**:

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8420',
    trace: 'on-first-retry',
    permissions: ['audio-capture'], // Required for audio tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8420',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

---

## Environment Configuration

```bash
# .env.example (committed to repo)
# Copy this file to .env and fill in your values

# Replicate API Token
# Get your token from https://replicate.com/account/api-tokens
VITE_REPLICATE_API_TOKEN=your_token_here

# Development Server Port (optional, defaults to 8420)
VITE_DEV_PORT=8420
```

```bash
# .env (gitignored - create this locally)
VITE_REPLICATE_API_TOKEN=r8_abc123...
VITE_DEV_PORT=8420
```

**Environment Variable Access**:

```typescript
// Type-safe environment variable access
const API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN as string
const DEV_PORT = import.meta.env.VITE_DEV_PORT || '8420'

// Validation on app start
if (!API_TOKEN) {
  throw new Error('VITE_REPLICATE_API_TOKEN is required')
}
```

**Vite Configuration**:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: parseInt(process.env.VITE_DEV_PORT || '8420'),
    hmr: {
      port: 8421,
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, // Faster builds for hackathon
  },
})
```

---

## Frontend Developer Standards

### Critical Coding Rules

**TypeScript**:
1. ✅ **Strict Mode Always**: Never disable `strict` in tsconfig.json
2. ✅ **Explicit Types**: Define interfaces for all props, state, and API responses
3. ✅ **No `any`**: Use `unknown` if type is truly unknown, then narrow with type guards
4. ✅ **Typed Hooks**: Always type useState, useRef, useCallback return values
5. ❌ **No Type Assertions**: Avoid `as` casts unless absolutely necessary (API boundaries only)

**React**:
1. ✅ **Functional Components**: Use FC<Props> pattern consistently
2. ✅ **Hooks Rules**: Follow Rules of Hooks (no conditionals, always same order)
3. ✅ **useCallback for Functions**: Memoize functions passed to child components
4. ✅ **Cleanup Effects**: Always cleanup timers, listeners, Tone.js objects in useEffect
5. ❌ **No Class Components**: Hackathon scope - functional only

**Audio (Tone.js)**:
1. ✅ **Audio Context Start**: Always call `Tone.start()` on user interaction
2. ✅ **Transport Control**: Use `Tone.getTransport()` for playback control
3. ✅ **Cleanup Audio**: Dispose of synths, effects, sequences on unmount
4. ✅ **Volume in dB**: Use decibel scale (-40dB to 0dB), never 0-1
5. ❌ **No Direct Web Audio API**: Use Tone.js abstractions exclusively

**Styling (Tailwind)**:
1. ✅ **Query Context7 First**: Check Tailwind docs via Context7 before using classes
2. ✅ **Pastel Horror Only**: Use custom horror-* colors, never default Tailwind colors
3. ✅ **cn() Helper**: Always use `cn()` from lib/utils for className merging
4. ✅ **Responsive Mobile-Last**: Desktop-first, tablet secondary, mobile tertiary
5. ❌ **No Inline Styles**: Use Tailwind utilities exclusively (except Tone.js audio nodes)

**Performance**:
1. ✅ **Lazy Load Heavy Components**: Use React.lazy for visualization components
2. ✅ **Debounce Audio Params**: Debounce slider changes to audio parameters (50ms)
3. ✅ **Memoize Expensive Computations**: Use useMemo for chord-to-notes conversion
4. ❌ **No Premature Optimization**: Optimize only if jank detected (hackathon speed priority)

**Git Workflow**:
1. ✅ **Commit Frequently**: Every 15-30 minutes or per feature increment
2. ✅ **Pre-Commit Validation**: typecheck + lint must pass (enforced by Husky)
3. ✅ **Descriptive Messages**: Use conventional commit format (feat:, fix:, style:, etc.)
4. ❌ **No Force Push**: Never force push to main branch

**API Integration**:
1. ✅ **Timeout All Requests**: 90s timeout for Replicate API (per NFR1)
2. ✅ **Error Handling**: Always try/catch async operations, show user-friendly errors
3. ✅ **Loading States**: Show loading UI for all async operations
4. ❌ **No Silent Failures**: Always surface errors to user (pastel horror styled)

### Quick Reference

**Common Commands**:
```bash
# Development
npm run dev                 # Start dev server (port 8420)
npm run build              # Production build (typecheck + vite build)
npm run preview            # Preview production build

# Quality Gates
npm run typecheck          # TypeScript validation
npm run lint               # ESLint validation
npm run lint:fix           # Auto-fix ESLint issues
npm run test:e2e           # Run Playwright tests
npm run test:e2e:ui        # Playwright UI mode (debugging)
npm run validate           # Full validation suite (typecheck + lint + test)

# Dependencies
npm install                # Install all dependencies
npx shadcn@latest add <component>  # Add shadcn/ui component
```

**Key Import Patterns**:
```typescript
// React and hooks
import { FC, useState, useEffect, useCallback, useMemo } from 'react'

// Tone.js
import * as Tone from 'tone'

// Tonal.js (music theory)
import { Chord, Note } from 'tonal'

// shadcn/ui components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Utils
import { cn } from '@/lib/utils'

// Types
import type { ChordData, AudioState } from '@/types/music'
```

**File Naming**:
- Components: `PascalCase.tsx`
- Hooks: `useAudioEngine.ts`
- Utils: `chord-parser.ts`
- Types: `music.ts`

**Project-Specific Patterns**:

**Chord Parsing**:
```typescript
import { Chord } from 'tonal'

function parseChord(notation: string): string[] {
  // notation: "C:maj" → ["C4", "E4", "G4"]
  const [root, type] = notation.split(':')
  const chordNotes = Chord.get(`${root}${type}`).notes
  return chordNotes.map(note => `${note}4`) // Octave 4
}
```

**Tone.js Synth Setup**:
```typescript
import * as Tone from 'tone'

const synth = new Tone.PolySynth(Tone.Synth, {
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
}).toDestination()

synth.volume.value = -12 // dB
```

**shadcn/ui Component Override**:
```typescript
import { Button } from '@/components/ui/button'

<Button className="bg-horror-mint hover:bg-horror-glow">
  Generate
</Button>
```

**Pastel Horror Hover Effect**:
```typescript
<div className={cn(
  'transition-all duration-200',
  'hover:shadow-lg hover:shadow-horror-mint/50',
  'hover:scale-105',
)}>
  Content
</div>
```

---

## Architecture Decision Records

### ADR-001: No Global State Library

**Context**: Hackathon timeline is 5 hours. Traditional state libraries (Redux, Zustand, Jotai) add setup overhead.

**Decision**: Use React hooks exclusively for state management.

**Rationale**:
- Audio state isolated in `useAudioEngine` hook
- API state isolated in `useReplicate` hook
- UI state local to components or lifted to App.tsx
- No complex cross-component state synchronization needed
- Saves 30-60 minutes of setup time

**Consequences**:
- Simpler architecture, faster development
- May need refactor if app grows beyond hackathon scope
- Acceptable trade-off for 5-hour timeline

### ADR-002: No Routing Library

**Context**: Single-page application with 3 view states (input, loading, playback).

**Decision**: Use view state enum + conditional rendering instead of React Router.

**Rationale**:
- Only 3 views, no URL requirements
- Routing library adds bundle size and complexity
- State-based views align with progressive disclosure pattern
- Saves 15-30 minutes of setup

**Consequences**:
- No browser back button navigation
- No URL sharing for specific states
- Acceptable for hackathon demo (users start fresh each time)

### ADR-003: Playwright Only for Testing

**Context**: Limited time for test infrastructure setup.

**Decision**: Skip unit tests (Vitest/Jest), use Playwright E2E only for critical flows.

**Rationale**:
- Playwright tests real browser audio context (catches Web Audio API issues)
- E2E tests validate full user experience, not implementation details
- Playwright MCP available in Claude Code for rapid test authoring
- Critical flows are simple (input → generate → playback)

**Consequences**:
- Less granular test coverage
- Slower test execution than unit tests
- Acceptable for hackathon validation strategy

### ADR-004: Tailwind with Context7 Verification

**Context**: Tailwind API changes between versions cause frequent errors with Claude.

**Decision**: Always query Context7 MCP for Tailwind docs before using classes.

**Rationale**:
- Prevents version mismatch bugs
- Official docs ensure correct API usage
- Context7 lookup adds <5s overhead per query
- Saves 10-30 minutes of debugging mismatched APIs

**Consequences**:
- Slight slowdown during development (acceptable trade-off)
- Requires discipline to query before using classes
- Prevents late-stage breakage from wrong Tailwind version

---

## Next Steps

This frontend architecture document provides everything needed to begin Epic 1 implementation:

1. **Initialize Vite Project** (Story 1.1)
2. **Configure Git Workflow** (Story 1.2)
3. **Set Up Validation Gates** (Story 1.3)
4. **Install Tailwind + Pastel Horror Theme** (Story 1.4)
5. **Install shadcn/ui Components** (Story 1.5)
6. **Configure Playwright** (Story 1.6)
7. **Deploy Canary Page** (Story 1.7)

**Ready for Developer Handoff**: All templates, types, and patterns defined for AI-assisted rapid development.
