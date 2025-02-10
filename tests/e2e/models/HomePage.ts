import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly getInTouchButton: Locator;
  readonly contactForm: Locator;
  readonly navLinks: Locator;
  readonly languageSelector: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchButton = page.getByRole('link', { name: /get in touch/i });
    this.contactForm = page.locator('#contact-section form');
    this.navLinks = page.locator('nav a[href^="#"]');
    this.languageSelector = page.getByRole('button', { name: /select language/i });
    this.themeToggle = page.getByRole('button', { name: /toggle theme/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickGetInTouch() {
    await this.getInTouchButton.click();
  }

  async fillContactForm(data: { name: string; email: string; message: string }) {
    await this.contactForm.getByLabel(/name/i).fill(data.name);
    await this.contactForm.getByLabel(/email/i).fill(data.email);
    await this.contactForm.getByLabel(/message/i).fill(data.message);
  }

  async submitContactForm() {
    await this.contactForm.getByRole('button', { name: /launch message/i }).click();
  }

  async changeLanguage(language: 'English' | 'Español (CO)') {
    await this.languageSelector.click();
    await this.page.getByRole('button', { name: language }).click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async waitForScroll(targetId: string) {
    await this.page.waitForFunction(
      (id) => {
        const element = document.querySelector(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight;
      },
      targetId
    );
  }
}