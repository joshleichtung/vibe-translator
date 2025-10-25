import { test, expect } from '@playwright/test'

/**
 * Smoke Tests - Basic app functionality validation
 *
 * Tests:
 * 1. App loads and renders with correct title
 * 2. Pastel horror theme applied (horror-butter background)
 * 3. Basic UI components (buttons, inputs, cards) are visible
 * 4. Page has proper structure and layout
 */

test.describe('Smoke Tests', () => {
  test('app loads and renders component showcase', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/vibe-translator/)

    // Check main heading renders
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('shadcn/ui Component Showcase')

    // Check subtitle
    await expect(page.getByText('Pastel Horror Theme Integration')).toBeVisible()
  })

  test('pastel horror theme applied - horror-butter background', async ({ page }) => {
    await page.goto('/')

    // Check main container has horror-butter background
    const mainContainer = page.locator('div.bg-horror-butter').first()
    await expect(mainContainer).toBeVisible()

    // Verify the background color is applied (not default white)
    const bgColor = await mainContainer.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )
    expect(bgColor).not.toBe('rgb(255, 255, 255)')
    expect(bgColor).toBeTruthy()
  })

  test('button components render with pastel horror styling', async ({ page }) => {
    await page.goto('/')

    // Check for "Buttons" section card title
    await expect(page.getByText('Buttons', { exact: true })).toBeVisible()

    // Verify specific buttons are present
    await expect(page.getByRole('button', { name: 'Generate Vibe' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Stop Playback' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Reset Parameters' })).toBeVisible()
  })

  test('input components render with placeholder text', async ({ page }) => {
    await page.goto('/')

    // Check for "Input" section card title
    await expect(page.getByText('Input', { exact: true })).toBeVisible()

    // Check for vibe input field
    const vibeInput = page.getByPlaceholder(/Enter your vibe description/)
    await expect(vibeInput).toBeVisible()

    // Verify input is interactive
    await vibeInput.fill('test vibe')
    await expect(vibeInput).toHaveValue('test vibe')
  })

  test('card components display correctly', async ({ page }) => {
    await page.goto('/')

    // Check for specific card title text (using exact match for the first occurrence)
    const djEffectsCard = page.locator('[data-slot="card-title"]', { hasText: 'DJ Effects' }).first()
    await expect(djEffectsCard).toBeVisible()

    // Check for other card titles
    await expect(page.getByText('Tempo Control')).toBeVisible()
    await expect(page.getByText('Volume Mix')).toBeVisible()
  })

  test('page has proper structure and layout', async ({ page }) => {
    await page.goto('/')

    // Check main container has correct classes
    const mainDiv = page.locator('div.min-h-screen.bg-horror-butter')
    await expect(mainDiv).toBeVisible()

    // Check max-width container exists
    const container = page.locator('div.max-w-6xl')
    await expect(container).toBeVisible()
  })
})
