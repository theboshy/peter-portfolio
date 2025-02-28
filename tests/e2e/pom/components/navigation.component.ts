import { type Locator, type Page } from "@playwright/test";

export class NavigationComponent {
  readonly page: Page;
  readonly navLinks: Locator;
  readonly languageSelector: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLinks = page.locator('nav a[href^="#"]');
    this.languageSelector = page.getByRole("button", {
      name: /select language/i,
    });
    this.themeToggle = page.getByRole("button", { name: /toggle theme/i });
  }

  async navigateToSection(section: string) {
    await this.navLinks.filter({ hasText: section }).click();
  }

  async changeLanguage(language: string) {
    await this.languageSelector.click();
    await this.page.getByRole("button", { name: language }).click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async getCurrentLanguage() {
    return this.languageSelector.textContent();
  }
}
