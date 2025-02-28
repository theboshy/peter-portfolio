import { test, expect } from "@playwright/test";
import { HomePage } from "../pom/pages/home.page";
import { viewports } from "../fixtures/viewports";
import { languages } from "../fixtures/languages";

test.describe("Navigation", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should navigate to all sections smoothly", async () => {
    const sections = ["expertise", "projects", "contact"];

    for (const section of sections) {
      await homePage.navigation.navigateToSection(section);
      await expect(await homePage.verifySection(`#${section}`)).toBeTruthy();
    }
  });

  test("should handle language switching", async () => {
    // Switch to Spanish
    await homePage.navigation.changeLanguage(languages.spanish.label);
    await expect(homePage.getInTouchButton).toHaveText(
      languages.spanish.getInTouch,
    );

    // Switch back to English
    await homePage.navigation.changeLanguage(languages.english.label);
    await expect(homePage.getInTouchButton).toHaveText(
      languages.english.getInTouch,
    );
  });

  test("should maintain navigation functionality across viewports", async () => {
    for (const [viewport] of Object.entries(viewports)) {
      const layout = await homePage.verifyResponsiveLayout(viewport);
      expect(layout.isNavigationVisible).toBeTruthy();
    }
  });
});
