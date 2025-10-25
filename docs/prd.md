# Vibe Translator Machine - Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Create a fun, interactive web audio application for the "Dumb Things AI Hackathon" that generates music from emotional/vibe descriptions
- Win "Dumbest Audio App" and "Best use of Replicate" prize categories through novel AI-to-music translation
- Build a live-demo-ready experience that allows users to jam along with AI-generated chord progressions using a Minichord interface
- Implement real-time DJ effects and visualizations tied to the musical output
- Complete a working MVP within 5 hours of hackathon time using pre-built modules and libraries
- Maintain code quality through progressive commits, TypeScript validation, and Playwright testing

### Background Context

The "Dumb Things AI Hackathon" encourages building silly but fun AI applications using inference and MCP. The Vibe Translator Machine takes emotional or situational descriptions (e.g., "rainy Sunday morning after a breakup," "my code finally compiled") and translates them into playable music using Replicate's MusicGen-Chord AI model.

Rather than just playing back the AI-generated audio, the system extracts the chord progression, tempo, and mood, then uses Tone.js synthesizers to create a "virtual band" that plays the structure. This hybrid approach combines the intelligence of AI music generation with the control and interactivity of web audio synthesis, allowing users to jam along using a Minichord interface while DJ effects and animations react to the music.

The project prioritizes fun, demo-ability, and rapid development over production polish, embracing a "pastel horror" aesthetic that's unsettling yet approachable - perfect for the "dumb but fun" hackathon vibe.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-25 | 0.1 | Initial draft for hackathon project | John (PM) |

---

## Requirements

### Functional Requirements

- FR1: User inputs a text description of a vibe/emotion/situation via a text input field
- FR2: System sends the vibe description to Replicate's MusicGen-Chord API to generate chord progression, tempo, and musical structure
- FR3: System parses the AI response to extract chord progression data (root notes, chord types, tempo)
- FR4: Tone.js synthesizers (bass, keys, drums) play back the chord progression as a "virtual band"
- FR5: User can interact with a Minichord interface to jam along with the generated music
- FR6: System provides DJ-style effects controls (reverb, delay, distortion, drum escalation)
- FR7: Real-time audio visualizations using Wavesurfer.js display waveforms synchronized with playback
- FR8: Additional animations react to musical events (chord changes, beat patterns, effects)
- FR9: User can start/stop playback and reset to generate a new vibe
- FR10: System displays the generated chord progression and tempo to the user
- FR11: System uses custom Claude Code skills for web audio synthesis and music theory operations
- FR12: Development workflow leverages MCP servers (Context7 for library docs, Sequential for debugging, Playwright for validation)
- FR13: System maintains TypeScript strict mode compilation throughout development with zero errors
- FR14: Code passes ESLint validation before each commit
- FR15: Playwright E2E tests validate critical user flows (vibe input → generation → playback)

### Non-Functional Requirements

- NFR1: AI chord generation must complete within 90 seconds to maintain demo flow
- NFR2: Web audio synthesis must have latency <50ms for responsive jamming experience
- NFR3: Application must work in modern browsers (Chrome, Firefox, Safari) without installation
- NFR4: UI must be visually engaging with "pastel horror" aesthetic to maximize hackathon entertainment value
- NFR5: Code must liberally use pre-built modules to stay within 5-hour development window
- NFR6: Application must be deployable to a public URL for live demo and judging
- NFR7: Development server runs on non-standard port (8420) to avoid conflicts with simultaneous projects
- NFR8: Project structure must support Claude Code skill creation for reusable web audio components
- NFR9: All third-party APIs must use environment variables for key management compatible with Claude Code workflows
- NFR10: Build process must complete in <30 seconds to support rapid iteration during hackathon
- NFR11: All code changes must be committed progressively with descriptive commit messages
- NFR12: GitHub repository must be kept in sync with local development (push frequently)
- NFR13: TypeScript compilation must succeed before any git push
- NFR14: Playwright validation tests must pass for core functionality before deployment
- NFR15: Development workflow includes automated validation gates (TS compile, lint, test) at commit boundaries

---

## User Interface Design Goals

### Overall UX Vision

The Vibe Translator Machine embraces a **"pastel horror"** aesthetic - unsettling yet approachable, blending soft, desaturated colors with slightly off-putting UI choices that enhance the "dumb but fun" hackathon vibe. Think: candy-colored nightmare, cursed candy shop, or a children's show filmed in an abandoned mall. The interface prioritizes immediate playability over conventional beauty, with oversized controls, exaggerated animations, and a visual language that screams "this probably shouldn't work but it does."

Users land on a single screen with a prominent text input for vibe descriptions. Upon generation, the interface transforms into an interactive music playground with chunky, tactile controls that feel physical despite being digital. Visual feedback is immediate, excessive, and delightfully unnecessary.

### Key Interaction Paradigms

- **Single-page experience** - No navigation, everything happens on one screen
- **Progressive disclosure** - Controls appear after music generation, not before
- **Immediate feedback** - Every interaction produces visual and audio response
- **Tactile UI** - Large, finger-friendly controls even on desktop (everything feels like a button)
- **Chaos-driven design** - Animations are slightly too fast, colors shift unexpectedly, nothing feels quite "right"

### Core Screens and Views

1. **Landing/Input State** - Oversized text input with pastel horror branding and example vibes
2. **Generation Loading State** - Unsettling loading animation with pastel colors
3. **Playback/Jam State** - Full interface with controls, visualizations, Minichord, and effects
4. **Reset/Regenerate** - Quick transition back to input state

### Accessibility

**Level: Basic Keyboard Navigation**

- Not targeting WCAG compliance (hackathon scope)
- Keyboard support for play/pause, effect toggles
- Skip screen reader optimization (time constraints)
- Focus states visible with pastel horror theme

### Branding: Pastel Horror Color Palette

**Core Palette (NO purple AI slop):**

```css
/* Primary - Sickly Pastels */
--horror-mint: #c8f7dc        /* Pale, hospital green */
--horror-peach: #ffd4c4       /* Unsettling flesh tone */
--horror-lavender: #e8d5ff    /* Washed-out lavender (NOT purple) */
--horror-butter: #fff4cc      /* Sour butter yellow */
--horror-coral: #ffb3b3       /* Faded blood pink */

/* Accents - Slightly "Off" */
--horror-rust: #d4a59a        /* Dried blood undertones */
--horror-sage: #b4c9a8        /* Moldy sage */
--horror-slate: #c9d4e0       /* Clinical blue-grey */

/* Darks - Muted, Not Black */
--horror-charcoal: #4a4a52    /* Soft charcoal, never pure black */
--horror-shadow: #6b6b7a      /* Mid-tone grey with blue shift */

/* Special Effects */
--horror-glow: #d4ffea        /* Radioactive glow for interactions */
--horror-warning: #ffc4a3     /* Pastel danger (still soft) */
```

**Anti-Patterns to Avoid:**
- ❌ No bright purple (#8B5CF6, #A855F7, etc.)
- ❌ No "tech startup blue" (#3B82F6, etc.)
- ❌ No saturated, vibrant colors
- ❌ No pure black backgrounds
- ❌ No gradient slop from AI tools

**Typography:**
- Monospace fonts for technical elements (chord progressions, tempo)
- Slightly-too-rounded sans-serif for UI controls (Comic Neue vibes but less obvious)
- Letter-spacing slightly too wide (creates unease)

**Visual Effects:**
- Subtle grain/noise texture overlay (VHS horror aesthetic)
- Borders slightly too thick or too thin (nothing feels standard)
- Drop shadows with pastel colors instead of grey
- Hover states shift hues slightly (not just brightness)

### Component Selection from awesome-shadcn-ui

**Must-Have Components:**
1. **Slider Components** - Volume, tempo, effect controls (use number-scrubber for draggable inputs)
2. **Button Variants** - Chunky, tactile buttons with pastel horror states
3. **Progress Indicators** - Track playback with custom pastel styling
4. **Drawer/Modal** - Vaul drawer for advanced controls (slides up from bottom)
5. **Animation Libraries** - Framer Motion or GSAP for excessive visual feedback

**Recommended Libraries from awesome-shadcn-ui:**
- **tremor** - Chart/dashboard components for visualizations
- **number-flow** - Smooth number transitions for tempo/BPM display
- **vaul** - Drawer component for "DJ Effects" panel
- **shadcn-number-scrubber** - Draggable numeric inputs for parameters
- **shadcn-color-picker** - Let users customize visualization colors (staying in pastel horror palette)

**Visual Inspiration:**
- Early 2000s Flash games UI (chunky, rounded, slightly broken)
- Medical equipment displays (clinical pastels, monospace readouts)
- Abandoned amusement park signage (faded, slightly wrong colors)
- Cursed children's educational software

### Target Device and Platforms

**Web Responsive (Desktop Primary)**

- Primary target: Desktop/laptop demo (live hackathon presentation)
- Secondary: Tablet landscape (bonus points if it works)
- Mobile: Not optimized, but shouldn't break catastrophically
- Browser targets: Latest Chrome/Firefox only

---

## Technical Assumptions

### Repository Structure: Single Repository (Simple Structure)

- Single repo with flat structure - NOT a formal monorepo setup
- No workspaces, no complex tooling - just one `package.json`
- Keep it dead simple: `/src`, `/public`, config files at root

**Rationale:** Monorepo tooling (Turborepo, Nx, pnpm workspaces) adds setup time and complexity we don't have. For a hackathon with one app, flat structure is fastest.

### Service Architecture: Client-side Web Application (SPA)

Single-page application running entirely in the browser:
- No backend server required (serverless via Replicate API)
- Static file hosting only (Vercel, Netlify, or DigitalOcean App Platform)
- All music synthesis happens in-browser via Web Audio API

**Rationale:** Minimizes complexity for 5-hour hackathon timeline, maximizes demo portability, eliminates deployment/scaling concerns.

### Testing Requirements: Progressive Validation with Playwright

**Testing Strategy:**

**Continuous Validation:**
- TypeScript compilation checked on every file save (Vite HMR feedback)
- ESLint runs on pre-commit hook (fast fail for style issues)
- Playwright E2E tests run before deployment

**Playwright Test Coverage:**
1. **Smoke Test**: App loads, input field renders
2. **Generation Flow**: Enter vibe → click generate → loading state → playback UI appears
3. **Audio Playback**: Play button functionality (audio context creation)
4. **Effect Controls**: Toggle effects, verify UI state changes
5. **Minichord Interaction**: Basic interaction with jam interface

**Test Execution Points:**
- **During Development**: Manual Playwright runs for debugging
- **Pre-Commit**: TypeScript + ESLint only (fast gates)
- **Pre-Push**: Full Playwright suite (comprehensive validation)
- **Pre-Deploy**: Full test suite + visual regression checks

**Rationale:** Playwright MCP available in Claude Code - leverage it for real browser validation. Catches audio API issues, visual bugs, and interaction problems that unit tests miss.

### Languages & Frameworks

- **Primary Language:** TypeScript (type safety for music theory, API contracts)
- **Frontend Framework:** Vite + TypeScript (minimal setup, <30s builds, HMR)
- **UI Library:** shadcn/ui + Tailwind CSS (copy-paste components, utility-first styling)
- **Build Tool:** Vite v7.0.0 (latest, fastest)

**Rationale:**
- Vite scaffold takes <2 minutes (`npm create vite@latest`)
- shadcn/ui provides pre-built, accessible components (no custom CSS needed)
- Tailwind prevents API version mismatches through Context7 docs lookup

### Key Libraries & APIs

**Audio & Music:**
- **Tone.js (v15+):** Web Audio synthesis, effects, scheduling
- **Wavesurfer.js (v7+):** Audio waveform visualization
- **Tonal.js:** Music theory utilities (chord parsing, transposition)

**AI & Backend:**
- **Replicate SDK:** MusicGen-Chord API integration
- **Fetch API:** Direct HTTP calls to Replicate (no heavy client needed)

**UI & Visualization:**
- **shadcn/ui:** Component library from awesome-shadcn-ui
- **Tailwind CSS:** Utility-first styling with pastel horror theme
- **Framer Motion:** Animations and transitions
- **Canvas API:** Custom music visualizations tied to chord changes

**Rationale:** All libraries are battle-tested, have excellent docs on Context7 MCP, and can be integrated quickly. Tone.js specifically designed for music apps.

### Claude Code Optimization Strategy

**MCP Servers Required:**

1. **Context7** - Primary docs source (eliminates version mismatch issues)
   - `/tailwindlabs/tailwindcss.com` - Always use official docs, not outdated knowledge
   - `/shadcn-ui/ui` - shadcn/ui latest patterns and components
   - `/vitejs/vite` - Vite v7.0.0 configuration
   - Tone.js, Wavesurfer.js, Replicate API docs

2. **shadcn-ui MCP Server** (Optional but recommended)
   - `/ymadd/shadcn-ui-mcp-server` - Direct component metadata access

3. **Sequential Thinking** - Complex debugging and API parsing

4. **Playwright MCP** - E2E test writing and validation

**Custom Skills to Create:**

1. **`webaudio-tonejs`** - Tone.js synthesis patterns, instrument configs, audio routing
2. **`music-theory`** - Chord parsing, progression validation, tempo calculations
3. **`replicate-api`** - Replicate API integration, response parsing, error handling
4. **`shadcn-components`** - Common shadcn/ui component patterns for this project

**Skill Creation Priority:**
- Build skills DURING development as patterns emerge
- Don't pre-build - wait until you repeat a pattern 2-3 times
- Focus on music/audio domain knowledge skills first

**Development Workflow:**

```
1. Claude Code initialization:
   - Load Context7 with /tailwindlabs/tailwindcss.com
   - Load Context7 with /shadcn-ui/ui
   - Load Context7 with /vitejs/vite

2. Before any Tailwind class usage:
   - Query Context7 for current API (prevent version mismatch)

3. Before adding shadcn components:
   - Use Context7 to get latest component code

4. For complex audio/music logic:
   - Use Sequential Thinking for debugging
   - Create skills after pattern repetition

5. For E2E testing:
   - Use Playwright MCP for test writing and debugging
```

**Critical Tailwind Anti-Pattern Prevention:**
- **NEVER** rely on Claude's built-in Tailwind knowledge
- **ALWAYS** query Context7 before using Tailwind classes
- **VERIFY** responsive breakpoints, color palettes, utility APIs via Context7
- Use shadcn/ui components to minimize custom Tailwind usage

### Port Configuration

- **Vite Dev Server:** `8420` (non-standard, no conflict)
- **Vite HMR:** `8421` (explicit WebSocket port)
- **No backend ports needed** (API calls are client-side to Replicate)

**Rationale:** Explicit non-standard ports prevent conflicts with simultaneous projects. Document in `.env` and vite.config.

Configure in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 8420,
    hmr: {
      port: 8421
    }
  }
})
```

### Environment Variables

```
VITE_REPLICATE_API_TOKEN=<token>
VITE_DEV_PORT=8420
```

**Rationale:** Vite's `VITE_` prefix exposes vars to client-side code. Keep API token in `.env` (gitignored).

### Deployment Target

**Primary:** DigitalOcean App Platform (hackathon sponsor, free tier)
**Backup:** Vercel or Netlify (fastest deploy if DO has issues)

**Rationale:** Use sponsor's platform for prize consideration. Static site deploys in <2 minutes on any platform.

### UI Component Strategy

- Install shadcn/ui via CLI: `npx shadcn@latest init`
- Cherry-pick components from awesome-shadcn-ui catalog as needed
- Use tremor for any chart/visualization components
- Integrate Framer Motion for animations (via shadcn ecosystem)

### Tailwind Custom Configuration

```typescript
// tailwind.config.ts - Pastel Horror Theme Extension
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
      'mono': ['JetBrains Mono', 'monospace'],
      'sans': ['Inter', 'system-ui', 'sans-serif'],
    }
  }
}
```

### shadcn/ui Components to Install

- `button` (base component, restyle with pastel horror)
- `input` (text input for vibe descriptions)
- `slider` (audio controls)
- `card` (contain sections of UI)
- `drawer` (vaul - for DJ effects panel)
- `progress` (loading and playback position)

### Custom shadcn Extensions

- `number-scrubber` from awesome-shadcn-ui for tempo/effect params
- `tremor` charts for waveform/visualization if time permits

### Quality Tools Configuration

**Linting & Type Checking:**
- **TypeScript:** Strict mode enabled (`"strict": true` in tsconfig.json)
- **ESLint:** TypeScript-aware rules, auto-fix on save
- **Prettier:** Skip for hackathon (ESLint formatting rules sufficient)

**Git Hooks (Simple Setup):**
- Use `husky` for pre-commit hooks
- Pre-commit: `npm run typecheck && npm run lint`
- Keep hooks fast (<5 seconds) to avoid friction

**Playwright Configuration:**

```typescript
// playwright.config.ts
{
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 8420,
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:8420',
    headless: true,
  },
  // Test only Chrome for hackathon speed
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
}
```

### npm Scripts

```json
{
  "scripts": {
    "dev": "vite --port 8420",
    "build": "tsc && vite build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "validate": "npm run typecheck && npm run lint && npm run test:e2e",
    "preview": "vite preview --port 8420"
  }
}
```

### Git Workflow Strategy

**Branch Strategy: Main Only (Hackathon Speed)**
- Single `main` branch (no feature branches due to time constraints)
- Commit frequently with descriptive messages
- Each commit should be a working state (rollback-ready)

**Commit Frequency:**
- After each feature increment (every 15-30 minutes)
- Before risky refactors (create restore point)
- After passing validation gates

**Commit Message Format:**
```
<type>: <short description>

Examples:
feat: add Replicate API integration
fix: resolve audio context timing issue
style: apply pastel horror color palette
test: add Playwright smoke tests
chore: configure Vite port to 8420
```

**Pre-Commit Validation Gate:**
```bash
# Run before every commit (hook or manual)
npm run typecheck  # Must pass
npm run lint       # Must pass
```

**Pre-Push Validation Gate:**
```bash
# Run before every push (ensure quality)
npm run typecheck
npm run lint
npm run test:e2e   # Playwright tests
```

**GitHub Integration:**
- Push to GitHub after every 2-3 commits
- Repository URL will be included in hackathon submission
- README with demo link and setup instructions

### Development Workflow Summary

**Session Start:**
```bash
git status && git pull
npm run dev
```

**During Development:**
```
1. Make changes
2. Save (Vite HMR validates TS)
3. Test manually in browser
4. Commit when feature complete
   → Pre-commit hook runs: typecheck + lint
5. Push every 2-3 commits
   → Manual: npm run test:e2e before push
```

**Pre-Deployment:**
```bash
npm run validate  # Full validation suite
npm run build     # Production build
git tag v1.0-hackathon
git push --tags
```

**Rollback Strategy:**
- Every commit is a restore point
- Use `git log --oneline` to find last working state
- `git reset --hard <commit-hash>` if needed

### Additional Technical Assumptions

- **No authentication/user accounts** - Single session, ephemeral data
- **No database** - All state in browser memory
- **No error tracking services** - Console logs sufficient for hackathon
- **Mobile support:** Not required, optimize for laptop/desktop demo
- **Browser targets:** Latest Chrome/Firefox only (no IE/legacy support)
- **Asset optimization:** Minimal - prioritize functionality over performance
- **Accessibility:** Basic keyboard navigation, no WCAG compliance needed
- **Git workflow:** Main branch only, commit frequently for rollback safety

---

## Epic List

### Epic 1: Foundation & Core Setup

**Goal:** Establish project infrastructure with Vite, TypeScript, Tailwind, shadcn/ui, and pastel horror theming. Set up Git workflow, validation tools (TypeScript, ESLint, Playwright), and deploy a "Hello World" canary page to verify the stack works end-to-end.

### Epic 2: AI Integration & Music Generation

**Goal:** Integrate Replicate MusicGen-Chord API to accept vibe descriptions and generate chord progressions with tempo. Parse API responses into playable musical data structures.

### Epic 3: Audio Playback Engine

**Goal:** Build Tone.js-based audio synthesis system that plays generated chord progressions with multiple instruments (bass, keys, drums). Implement play/pause controls and basic playback UI.

### Epic 4: Interactive Jam & Effects

**Goal:** Add Minichord interface for user jamming, DJ-style effects (reverb, delay, distortion, drum escalation), and visualizations (Wavesurfer waveforms + custom animations) tied to musical events.

### Epic 5: Polish & Demo Readiness

**Goal:** Apply pastel horror aesthetic throughout UI, add loading states, improve UX flow, deploy to DigitalOcean, and ensure live demo reliability with Playwright validation.

---

## Epic 1: Foundation & Core Setup

**Expanded Goal:** Establish a production-ready development environment with all necessary tooling, validation gates, and deployment infrastructure. By the end of this epic, the project will have TypeScript compilation, ESLint validation, Playwright testing, Git hooks, shadcn/ui with pastel horror theming, and a deployed canary page proving the entire pipeline works. This foundation ensures rapid, validated iteration for the remaining epics.

### Story 1.1: Initialize Vite Project with TypeScript

**As a** developer,
**I want** a Vite + TypeScript project scaffold with strict mode enabled,
**so that** I have type safety and fast builds from the start.

**Acceptance Criteria:**
1. Vite project created with TypeScript template (`npm create vite@latest`)
2. TypeScript strict mode enabled in `tsconfig.json`
3. Development server runs on port 8420 (configured in `vite.config.ts`)
4. HMR WebSocket configured on port 8421
5. Project builds successfully with `npm run build`
6. `npm run typecheck` script added and passes with zero errors

### Story 1.2: Configure Git Repository and Workflow

**As a** developer,
**I want** Git repository configured with proper ignores and commit workflow,
**so that** I can track changes progressively and maintain rollback points.

**Acceptance Criteria:**
1. Git repository initialized with `git init`
2. `.gitignore` includes `node_modules/`, `.env`, `dist/`, `.env.local`
3. Initial commit created with project scaffold
4. GitHub repository created and linked as remote origin
5. README.md created with project description and setup instructions
6. First push to GitHub succeeds

### Story 1.3: Set Up ESLint and Validation Gates

**As a** developer,
**I want** ESLint configured with TypeScript rules and pre-commit hooks,
**so that** code quality is maintained automatically before commits.

**Acceptance Criteria:**
1. ESLint installed with TypeScript plugin
2. ESLint config includes recommended TypeScript rules
3. `npm run lint` script added and passes
4. Husky installed for Git hooks
5. Pre-commit hook runs `typecheck && lint` (must pass to commit)
6. Hook execution time <5 seconds for developer ergonomics

### Story 1.4: Install and Configure Tailwind CSS with Pastel Horror Theme

**As a** developer,
**I want** Tailwind CSS configured with custom pastel horror color palette,
**so that** I can style components with the unique hackathon aesthetic.

**Acceptance Criteria:**
1. Tailwind CSS installed and configured in Vite project
2. `tailwind.config.ts` includes all pastel horror color variables
3. Custom font families configured (JetBrains Mono, Inter)
4. Tailwind directives added to main CSS file
5. Test component created using custom colors to verify theme works
6. Build succeeds with Tailwind processing

### Story 1.5: Install shadcn/ui and Core Components

**As a** developer,
**I want** shadcn/ui installed with essential components (button, input, card, slider),
**so that** I can build UI quickly with pre-styled, accessible components.

**Acceptance Criteria:**
1. shadcn/ui CLI initialized (`npx shadcn@latest init`)
2. Components installed: button, input, card, slider, progress, drawer
3. Components styled with pastel horror theme overrides
4. Test page created showing all installed components
5. Components render correctly in development server
6. TypeScript definitions work for all components

### Story 1.6: Set Up Playwright for E2E Testing

**As a** developer,
**I want** Playwright configured to run E2E tests against the Vite dev server,
**so that** I can validate critical user flows before deployment.

**Acceptance Criteria:**
1. Playwright installed with TypeScript support
2. `playwright.config.ts` configured with port 8420 web server
3. Test directory created at `tests/e2e/`
4. Smoke test written: app loads and renders basic UI
5. `npm run test:e2e` script runs tests successfully
6. `npm run test:e2e:ui` opens Playwright UI for debugging

### Story 1.7: Create Canary Page and Deploy to DigitalOcean

**As a** developer,
**I want** a simple "Hello World" page deployed to DigitalOcean App Platform,
**so that** I verify the entire development-to-deployment pipeline works.

**Acceptance Criteria:**
1. Canary page displays "Vibe Translator Machine" with pastel horror styling
2. Page shows "Coming Soon" message with example vibe text
3. Production build completes successfully (`npm run build`)
4. DigitalOcean App Platform project created and configured
5. Static site deployed from GitHub repository
6. Public URL accessible and displays canary page correctly
7. Deployment takes <5 minutes from push to live

---

## Epic 2: AI Integration & Music Generation

**Expanded Goal:** Integrate Replicate's MusicGen-Chord API to transform user-provided vibe descriptions into structured musical data (chord progressions, tempo, mood). Implement robust API communication, response parsing, error handling, and data validation. By the end of this epic, users can input a vibe, trigger AI generation, and receive parseable chord/tempo data ready for audio synthesis.

### Story 2.1: Set Up Replicate API Client

**As a** developer,
**I want** Replicate SDK configured with environment variable for API token,
**so that** I can make authenticated requests to MusicGen-Chord.

**Acceptance Criteria:**
1. Replicate SDK installed (`npm install replicate`)
2. `.env` file includes `VITE_REPLICATE_API_TOKEN`
3. API client wrapper created with type-safe configuration
4. Client initialization validates token presence
5. Environment variable accessible via `import.meta.env.VITE_REPLICATE_API_TOKEN`
6. TypeScript types defined for API client methods

### Story 2.2: Create Vibe Input Form Component

**As a** user,
**I want** a text input field where I can describe a vibe or emotion,
**so that** I can trigger AI music generation.

**Acceptance Criteria:**
1. Input component uses shadcn/ui `Input` with pastel horror styling
2. Placeholder text shows example vibes ("rainy Sunday after a breakup")
3. Submit button styled with pastel horror colors
4. Form prevents empty submissions
5. Loading state shown during API request (button disabled)
6. Component renders on landing page with proper spacing

### Story 2.3: Implement Replicate API Call for MusicGen-Chord

**As a** developer,
**I want** a function that sends vibe descriptions to MusicGen-Chord API,
**so that** I receive AI-generated chord progressions and tempo.

**Acceptance Criteria:**
1. Function accepts vibe string as parameter
2. API request includes vibe as text prompt to MusicGen-Chord
3. Request specifies chord output format (text-based chord notation)
4. Function returns Promise with API response
5. Error handling catches network failures and API errors
6. TypeScript types defined for API request and response

### Story 2.4: Parse MusicGen-Chord Response into Musical Data

**As a** developer,
**I want** a parser that extracts chord progressions and tempo from API response,
**so that** I have structured data ready for audio synthesis.

**Acceptance Criteria:**
1. Parser extracts chord notation (ROOT:TYPE format, e.g., "C:maj", "G:min7")
2. Tempo/BPM extracted from response metadata
3. Chord sequence converted to array of objects with root, type, duration
4. Invalid chords filtered or converted to valid types
5. Parser handles missing or malformed data gracefully
6. Unit tests validate parser with sample API responses
7. TypeScript types defined for parsed musical data structure

### Story 2.5: Display Generated Chord Progression to User

**As a** user,
**I want** to see the AI-generated chord progression and tempo displayed on screen,
**so that** I understand what musical structure was created from my vibe.

**Acceptance Criteria:**
1. Chord progression displayed as formatted text (e.g., "C maj → G min7 → F maj → Am min")
2. Tempo/BPM shown with monospace font (pastel horror styling)
3. Display appears after successful API response
4. Component updates when new vibe generated
5. Styling matches pastel horror aesthetic
6. Mobile responsive layout

### Story 2.6: Add Error Handling and User Feedback

**As a** user,
**I want** clear feedback when API requests fail or take too long,
**so that** I know what's happening and can retry if needed.

**Acceptance Criteria:**
1. Loading spinner shown during API request (pastel horror styled)
2. Error message displayed if API fails (with pastel warning colors)
3. Timeout after 90 seconds with user-friendly message
4. Retry button appears on error
5. Success state clears previous errors
6. All error messages styled with pastel horror aesthetic

---

## Epic 3: Audio Playback Engine

**Expanded Goal:** Build a Tone.js-based audio synthesis system that transforms parsed chord progression data into playable music using multiple virtual instruments (bass, keys, drums). Implement transport controls (play, pause, stop), tempo synchronization, and basic UI for playback state. By the end of this epic, users can trigger playback of AI-generated music and control it via simple UI.

### Story 3.1: Initialize Tone.js Audio Context

**As a** developer,
**I want** Tone.js configured and audio context initialized on user interaction,
**so that** I can synthesize audio in the browser without autoplay restrictions.

**Acceptance Criteria:**
1. Tone.js installed (`npm install tone`)
2. Audio context initialized on first user interaction (click/tap)
3. Transport configured with default tempo (120 BPM)
4. Function to update transport tempo based on AI-generated BPM
5. Audio context state managed (suspended → running)
6. TypeScript types imported for Tone.js

### Story 3.2: Create Synthesizer Instruments (Bass, Keys, Drums)

**As a** developer,
**I want** multiple Tone.js synthesizers configured for different instrument roles,
**so that** I can create a "virtual band" sound with bass, melodic, and percussive elements.

**Acceptance Criteria:**
1. Bass synth created with low-frequency monophonic sound
2. Keys synth created with polyphonic chords (PolySynth)
3. Drum synth/sampler created for percussive elements
4. Each instrument routed to master output with gain control
5. Instruments configured with appropriate ADSR envelopes
6. TypeScript types defined for instrument configurations

### Story 3.3: Convert Chord Data to Tone.js Playback Sequence

**As a** developer,
**I want** a function that converts chord progression data into Tone.js Part/Sequence,
**so that** chords play back in time with correct notes and rhythm.

**Acceptance Criteria:**
1. Function accepts parsed chord data and tempo
2. Chord roots and types converted to note arrays (e.g., "C:maj" → ["C4", "E4", "G4"])
3. Tone.js Part created with scheduled chord events
4. Bass notes play on beat 1 of each bar
5. Drums trigger on each beat (simple 4/4 pattern)
6. Sequence loops correctly for continuous playback

### Story 3.4: Implement Play/Pause/Stop Controls

**As a** user,
**I want** buttons to play, pause, and stop the generated music,
**so that** I can control playback.

**Acceptance Criteria:**
1. Play button starts Tone.js Transport and triggers synthesis
2. Pause button stops Transport without resetting position
3. Stop button stops Transport and resets to beginning
4. Button states update based on playback state (playing/paused/stopped)
5. Buttons styled with pastel horror theme
6. Keyboard shortcuts work (spacebar for play/pause)

### Story 3.5: Create Playback Progress Indicator

**As a** user,
**I want** a visual indicator showing playback progress through the chord progression,
**so that** I know where we are in the musical structure.

**Acceptance Criteria:**
1. Progress bar component using shadcn/ui `Progress`
2. Progress updates in real-time during playback
3. Bar loops when sequence repeats
4. Current chord highlighted in progression display
5. Styled with pastel horror colors
6. Smooth animation without jank

### Story 3.6: Add Basic Volume Control

**As a** user,
**I want** a slider to control master volume,
**so that** I can adjust playback loudness.

**Acceptance Criteria:**
1. Slider component using shadcn/ui `Slider`
2. Volume range: -40dB to 0dB (quiet to max)
3. Master gain node controlled by slider value
4. Default volume set to -12dB (safe level)
5. Slider styled with pastel horror theme
6. Volume changes apply immediately during playback

---

## Epic 4: Interactive Jam & Effects

**Expanded Goal:** Add interactive musical features allowing users to jam along with the generated music using a Minichord interface, apply DJ-style audio effects (reverb, delay, distortion, drum escalation), and visualize audio with Wavesurfer waveforms plus custom animations tied to musical events. This epic transforms the app from a passive player into an interactive music playground.

### Story 4.1: Create Minichord Input Interface

**As a** user,
**I want** a Minichord-style interface where I can trigger chords with simple clicks,
**so that** I can jam along with the AI-generated music.

**Acceptance Criteria:**
1. Minichord component displays grid of chord buttons (4x4 or 3x4 layout)
2. Each button labeled with chord name (derived from current key)
3. Clicking button triggers Tone.js PolySynth to play chord
4. Chords play in sync with Transport timing
5. Buttons styled with pastel horror colors and tactile feel
6. Mobile-friendly touch targets (minimum 48px)

### Story 4.2: Implement Reverb Effect Control

**As a** user,
**I want** a control to add reverb to the music,
**so that** I can create spacious, ambient sounds.

**Acceptance Criteria:**
1. Tone.js Reverb effect created and routed to master
2. Slider control for reverb wet/dry mix (0-100%)
3. Toggle button to enable/disable reverb
4. Effect applies to all instruments (bass, keys, drums)
5. Control styled with pastel horror theme
6. Smooth parameter transitions without audio clicks

### Story 4.3: Implement Delay Effect Control

**As a** user,
**I want** a control to add delay/echo to the music,
**so that** I can create rhythmic echo patterns.

**Acceptance Criteria:**
1. Tone.js FeedbackDelay effect created and routed
2. Slider for delay time (synchronized to tempo divisions)
3. Slider for feedback amount (0-90%)
4. Toggle button to enable/disable delay
5. Control styled with pastel horror theme
6. Delay time updates when tempo changes

### Story 4.4: Implement Distortion Effect Control

**As a** user,
**I want** a control to add distortion to the music,
**so that** I can create grittier, more aggressive sounds.

**Acceptance Criteria:**
1. Tone.js Distortion effect created and routed
2. Slider for distortion amount (0-1.0)
3. Toggle button to enable/disable distortion
4. Effect applies to all instruments
5. Control styled with pastel horror theme
6. Distortion doesn't cause clipping or audio artifacts

### Story 4.5: Implement Drum Escalation Control

**As a** user,
**I want** a button to escalate drum intensity,
**so that** I can build energy like a DJ transition.

**Acceptance Criteria:**
1. Button triggers drum pattern change (simple → complex)
2. Escalation adds hi-hats, snare rolls, or kick density
3. De-escalation button returns to simple pattern
4. Transitions happen on beat boundaries (no timing glitches)
5. Button styled with pastel horror theme
6. Visual feedback during escalation state

### Story 4.6: Add Wavesurfer Waveform Visualization

**As a** user,
**I want** a waveform display showing real-time audio output,
**so that** I can see the music as it plays.

**Acceptance Criteria:**
1. Wavesurfer.js installed and initialized
2. Waveform displays real-time audio from master output
3. Waveform colors use pastel horror palette
4. Visualization updates smoothly during playback
5. Component positioned prominently in UI
6. Responsive sizing for different screen widths

### Story 4.7: Create Custom Animations Tied to Musical Events

**As a** user,
**I want** visual animations that react to chord changes and beats,
**so that** the interface feels alive and connected to the music.

**Acceptance Criteria:**
1. Background color shifts subtly on chord changes (within pastel palette)
2. Beat-synchronized pulse animation on key UI elements
3. Effect controls glow when active
4. Framer Motion used for smooth transitions
5. Animations don't cause performance issues
6. All animations follow pastel horror aesthetic (slightly unsettling timing)

---

## Epic 5: Polish & Demo Readiness

**Expanded Goal:** Apply final pastel horror aesthetic polish throughout the UI, add comprehensive loading states, improve user experience flow, deploy production build to DigitalOcean, and validate demo reliability with full Playwright test suite. Ensure the app is demo-ready with no obvious bugs, works reliably for live presentation, and delivers the intended "dumb but fun" hackathon experience.

### Story 5.1: Apply Pastel Horror Styling to All Components

**As a** developer,
**I want** all UI components consistently styled with pastel horror aesthetic,
**so that** the visual experience is cohesive and memorable.

**Acceptance Criteria:**
1. All buttons use pastel horror colors with custom hover states
2. Input fields styled with subtle borders and pastel backgrounds
3. Cards and containers use muted pastel backgrounds
4. Typography uses configured fonts (monospace for data, rounded sans for UI)
5. Drop shadows use pastel colors instead of grey
6. No default shadcn/ui purple or blue visible anywhere

### Story 5.2: Create Loading States for API Calls

**As a** user,
**I want** clear, entertaining loading animations while AI generates music,
**so that** I know the system is working and stay engaged.

**Acceptance Criteria:**
1. Loading spinner/animation uses pastel horror colors
2. Loading message displays creative text ("Translating your vibe...", "Summoning the band...")
3. Progress indication if API provides status updates
4. Loading state prevents duplicate submissions
5. Animation styled to be slightly unsettling but not annoying
6. Mobile responsive layout

### Story 5.3: Improve UX Flow and State Transitions

**As a** user,
**I want** smooth transitions between input, loading, and playback states,
**so that** the experience feels polished and intentional.

**Acceptance Criteria:**
1. Smooth fade transitions between states (Framer Motion)
2. Input form hides/minimizes during playback (progressive disclosure)
3. "Generate New Vibe" button easily accessible during playback
4. State transitions don't disrupt audio playback
5. All transitions follow pastel horror aesthetic timing (slightly too fast or too slow)
6. Keyboard shortcuts work across all states

### Story 5.4: Add Example Vibes and Onboarding

**As a** user,
**I want** example vibe descriptions and quick hints on how to use the app,
**so that** I can start creating music immediately without confusion.

**Acceptance Criteria:**
1. Landing page shows 3-4 example vibes as clickable suggestions
2. Clicking example auto-fills input field
3. Tooltip or brief instructions explain Minichord usage
4. Instructions styled with pastel horror theme
5. Examples demonstrate variety (emotional states, situations, absurd scenarios)
6. Mobile-friendly tap targets for examples

### Story 5.5: Run Full Playwright Test Suite and Fix Issues

**As a** developer,
**I want** comprehensive Playwright tests validating all user flows,
**so that** I catch bugs before live demo.

**Acceptance Criteria:**
1. All existing Playwright tests pass
2. Additional tests cover: example vibe clicks, effect toggles, Minichord interaction
3. Visual regression tests capture key screens
4. Tests run in headless mode for CI/CD
5. Test failures investigated and fixed
6. `npm run validate` passes completely

### Story 5.6: Deploy Production Build to DigitalOcean

**As a** developer,
**I want** optimized production build deployed to DigitalOcean App Platform,
**so that** the app is publicly accessible for judging and demos.

**Acceptance Criteria:**
1. Production build created with `npm run build`
2. Build optimizations enabled (code splitting, minification)
3. Environment variables configured in DigitalOcean dashboard
4. Static assets served with proper caching headers
5. Public URL accessible and functional
6. Deployment completes in <5 minutes from push

### Story 5.7: Create Demo Script and Test Reliability

**As a** developer,
**I want** a tested demo script and verification of app reliability,
**so that** live hackathon presentation goes smoothly.

**Acceptance Criteria:**
1. Demo script written with 2-minute flow (vibe input → generation → playback → effects → jam)
2. Script includes 2-3 example vibes with known good results
3. App tested under demo conditions (projector, slow network, etc.)
4. Fallback plan documented for API failures
5. README updated with demo URL and description
6. All validation gates pass (`npm run validate`)

---

## Next Steps

### UX Expert Prompt

"Review the Vibe Translator Machine PRD and design a detailed UX specification focusing on the pastel horror aesthetic, single-page interaction flow, and progressive disclosure patterns. Ensure the design supports live demo presentation with clear visual hierarchy and tactile controls."

### Architect Prompt

"Review the Vibe Translator Machine PRD and create a comprehensive technical architecture document. Focus on Vite + TypeScript setup, Tone.js audio architecture, Replicate API integration patterns, shadcn/ui component structure, and Playwright testing strategy. Ensure the architecture supports rapid 5-hour hackathon development with progressive validation gates."
