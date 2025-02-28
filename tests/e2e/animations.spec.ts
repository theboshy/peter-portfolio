import { test, expect } from "@playwright/test";
import { HomePage } from "./models/HomePage";

test.describe("Animations and Interactions", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should animate scroll to contact section", async () => {
    const startPosition = await homePage.page.evaluate(() => window.scrollY);
    await homePage.clickGetInTouch();

    // Wait for scroll animation to complete
    await homePage.page.waitForFunction(() => {
      const endPosition = window.scrollY;
      return (
        endPosition > 0 &&
        !document.documentElement.classList.contains("scrolling")
      );
    });

    const endPosition = await homePage.page.evaluate(() => window.scrollY);
    expect(endPosition).toBeGreaterThan(startPosition);
  });

  test("should show hover effects on interactive elements", async () => {
    // Test button hover states
    await homePage.getInTouchButton.hover();
    await expect(homePage.getInTouchButton).toHaveCSS("transform", /scale/);

    // Test navigation link hover effects
    const navLink = homePage.navLinks.first();
    await navLink.hover();
    await expect(navLink).toHaveCSS("color", /rgb\(255, 255, 255\)/);
  });

  test("should animate theme transition", async () => {
    await homePage.toggleTheme();

    // Verify smooth transition
    const body = homePage.page.locator("body");
    await expect(body).toHaveCSS("transition-property", /background-color/);
    await expect(body).toHaveCSS("transition-duration", /300ms/);
  });

  test("should show loading states during form submission", async () => {
    await homePage.clickGetInTouch();
    await homePage.fillContactForm({
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
    });

    const submitButton = homePage.contactForm.getByRole("button");
    await submitButton.click();

    // Verify loading state
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveText(/sending/i);
  });
});
