import { test, expect } from '@playwright/test';
import { HomePage } from './models/HomePage';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should scroll to contact section when clicking Get in Touch', async () => {
    await homePage.clickGetInTouch();
    await homePage.waitForScroll('#contact-section');
    
    const contactSection = await homePage.page.locator('#contact-section');
    await expect(contactSection).toBeInViewport();
  });

  test('should handle contact form submission', async () => {
    await homePage.clickGetInTouch();
    await homePage.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
    await homePage.submitContactForm();

    // Verify form submission feedback
    await expect(homePage.contactForm).toContainText(/sending|message sent/i);
  });

  test('should validate contact form fields', async () => {
    await homePage.clickGetInTouch();
    await homePage.submitContactForm();

    // Check for error messages
    await expect(homePage.contactForm).toContainText(/name is required/i);
    await expect(homePage.contactForm).toContainText(/email is required/i);
    await expect(homePage.contactForm).toContainText(/message is required/i);
  });

  test('should switch languages correctly', async () => {
    // Switch to Spanish
    await homePage.changeLanguage('Español (CO)');
    await expect(homePage.getInTouchButton).toHaveText(/contactar/i);

    // Switch back to English
    await homePage.changeLanguage('English');
    await expect(homePage.getInTouchButton).toHaveText(/get in touch/i);
  });

  test('should toggle theme', async () => {
    const body = homePage.page.locator('body');
    const initialTheme = await body.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );

    await homePage.toggleTheme();

    const newTheme = await body.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(newTheme).not.toBe(initialTheme);
  });
});