import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E Test Configuration
 *
 * Dev server: http://localhost:8420
 * HMR WebSocket: 8421
 * Audio permissions enabled for Web Audio API tests
 */
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
    permissions: ['audio-capture'], // Required for Tone.js audio tests
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox and Safari skipped for hackathon speed
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8420',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes for server start
  },
})
