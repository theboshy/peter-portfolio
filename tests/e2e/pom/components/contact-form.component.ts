import { type Locator, type Page } from '@playwright/test';

export class ContactFormComponent {
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.form = page.locator('#contact-section form');
    this.nameInput = this.form.getByLabel(/name/i);
    this.emailInput = this.form.getByLabel(/email/i);
    this.messageInput = this.form.getByLabel(/message/i);
    this.submitButton = this.form.getByRole('button', { name: /launch message/i });
    this.errorMessages = this.form.locator('.text-red-500');
  }

  async fill(data: { name: string; email: string; message: string }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.messageInput.fill(data.message);
  }

  async submit() {
    await this.submitButton.click();
  }

  async getErrors() {
    const errors = await this.errorMessages.all();
    return Promise.all(errors.map(error => error.textContent()));
  }

  async isSubmitting() {
    return this.submitButton.isDisabled();
  }

  async getSubmitButtonText() {
    return this.submitButton.textContent();
  }
}