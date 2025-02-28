import { type Locator, type Page } from "@playwright/test";

export class CommandConsoleComponent {
  readonly toggleButton: Locator;
  readonly console: Locator;
  readonly input: Locator;
  readonly output: Locator;
  readonly minimizeButton: Locator;

  constructor(page: Page) {
    this.toggleButton = page.getByRole("button", { name: /toggle console/i });
    this.console = page.locator(".console");
    this.input = page.locator(".console input");
    this.output = page.locator(".console .output");
    this.minimizeButton = page.getByRole("button", { name: /minimize/i });
  }

  async open() {
    await this.toggleButton.click();
  }

  async minimize() {
    await this.minimizeButton.click();
  }

  async executeCommand(command: string) {
    await this.input.fill(command);
    await this.input.press("Enter");
  }

  async getOutput() {
    return this.output.textContent();
  }

  async isVisible() {
    return this.console.isVisible();
  }
}
