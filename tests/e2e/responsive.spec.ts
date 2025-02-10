import { test, expect } from '@playwright/test';
import { HomePage } from './models/HomePage';

test.describe('Responsive Design', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should adapt layout for mobile devices', async ({ isMobile }) => {
    if (!isMobile) test.skip();

    // Check navigation menu behavior
    const nav = homePage.page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Verify text content is readable
    const hero = homePage.page.locator('section').first();
    const fontSize = await hero.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    expect(parseInt(fontSize)).toBeGreaterThan(14);

    // Check responsive grid layouts
    const expertiseGrid = homePage.page.locator('.grid');
    const columns = await expertiseGrid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    expect(columns).toBe('1fr');
  });

  test('should maintain interactive elements accessibility on touch devices', async ({ isMobile }) => {
    if (!isMobile) test.skip();

    // Verify touch targets are large enough
    const buttons = homePage.page.locator('button, a[href]');
    for (const button of await buttons.all()) {
      const size = await button.boundingBox();
      expect(size?.width).toBeGreaterThanOrEqual(44);
      expect(size?.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should handle different screen sizes', async ({ browserName }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 },  // iPhone SE
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }  // Desktop
    ];

    for (const viewport of viewports) {
      await homePage.page.setViewportSize(viewport);
      
      // Verify critical elements remain visible
      await expect(homePage.getInTouchButton).toBeVisible();
      await expect(homePage.contactForm).toBeVisible();
      
      // Check layout integrity
      const hero = homePage.page.locator('section').first();
      await expect(hero).toBeVisible();
      await expect(hero).not.toHaveCSS('overflow', 'hidden');
    }
  });
});