import { type Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { type Page } from "@playwright/test";

export class HomePage extends BasePage {
  readonly getInTouchButton: Locator;
  readonly navLinks: Locator;
  readonly languageSelector: Locator;
  readonly themeToggle: Locator;

  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.getInTouchButton = page.getByRole("link", { name: /get in touch/i });
    this.navLinks = page.locator('nav a[href^="#"]');
    this.languageSelector = page.getByRole("button", {
      name: /select language/i,
    });
    this.themeToggle = page.getByRole("button", { name: /toggle theme/i });

    this.contactForm = page.locator("#contact-section form");
    this.nameInput = this.contactForm.getByLabel(/name/i);
    this.emailInput = this.contactForm.getByLabel(/email/i);
    this.messageInput = this.contactForm.getByLabel(/message/i);
    this.submitButton = this.contactForm.getByRole("button", {
      name: /launch message/i,
    });
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    message: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.messageInput.fill(data.message);
  }

  async submitContactForm() {
    await this.submitButton.click();
  }

  async changeLanguage(language: string) {
    await this.languageSelector.click();
    await this.page.getByRole("button", { name: language }).click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async getFormErrors() {
    const errors = await this.contactForm.locator(".text-red-500").all();
    return Promise.all(errors.map((error) => error.textContent()));
  }

  async waitForFormSubmission() {
    await this.page.waitForFunction(() => {
      const button = document.querySelector('form button[type="submit"]');
      return button?.textContent?.toLowerCase().includes("sending");
    });
  }
}
