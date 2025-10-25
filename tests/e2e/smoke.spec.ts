import { test, expect } from '@playwright/test'

/**
 * Smoke Tests - Basic app functionality validation
 *
 * Tests:
 * 1. App loads and renders with correct title
 * 2. Pastel horror theme applied (horror-butter background)
 * 3. Basic UI elements are visible and interactive
 */

test.describe('Smoke Tests', () => {
  test('app loads and renders title', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/vibe-translator/)

    // Check main heading renders
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Pastel Horror Theme Test')
  })

  test('pastel horror theme applied - horror-butter background', async ({ page }) => {
    await page.goto('/')

    // Check body has horror-butter background
    const body = page.locator('body')
    const bgColor = await body.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )

    // horror-butter should NOT be default white (rgb(255, 255, 255))
    expect(bgColor).not.toBe('rgb(255, 255, 255)')
    expect(bgColor).toBeTruthy()
  })

  test('all horror theme color swatches render', async ({ page }) => {
    await page.goto('/')

    // Check that all 11 color swatches are visible
    const swatches = page.locator('div.grid > div')
    await expect(swatches).toHaveCount(11)

    // Verify specific color swatches are present
    await expect(page.getByText('horror-mint')).toBeVisible()
    await expect(page.getByText('horror-peach')).toBeVisible()
    await expect(page.getByText('horror-lavender')).toBeVisible()
    await expect(page.getByText('horror-coral')).toBeVisible()
    await expect(page.getByText('horror-rust')).toBeVisible()
    await expect(page.getByText('horror-sage')).toBeVisible()
    await expect(page.getByText('horror-slate')).toBeVisible()
    await expect(page.getByText('horror-charcoal')).toBeVisible()
    await expect(page.getByText('horror-glow')).toBeVisible()
    await expect(page.getByText('horror-warning')).toBeVisible()
    await expect(page.getByText('horror-shadow')).toBeVisible()
  })

  test('font tests render correctly', async ({ page }) => {
    await page.goto('/')

    // Check for font test section
    const fontSection = page.locator('div.mt-8.p-4')
    await expect(fontSection).toBeVisible()

    // Verify both font family tests are present
    await expect(page.getByText(/Font Test: Inter/)).toBeVisible()
    await expect(page.getByText(/Font Test: JetBrains Mono/)).toBeVisible()
  })

  test('page has proper structure and layout', async ({ page }) => {
    await page.goto('/')

    // Check main container has correct classes
    const mainDiv = page.locator('div.min-h-screen')
    await expect(mainDiv).toBeVisible()

    // Check grid layout is present
    const grid = page.locator('div.grid.grid-cols-3')
    await expect(grid).toBeVisible()
  })
})
