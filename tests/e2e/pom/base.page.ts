import { type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async waitForScroll(targetId: string) {
    await this.page.waitForFunction((id) => {
      const element = document.querySelector(id);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    }, targetId);
  }

  async getComputedStyle(selector: string, property: string) {
    const element = this.page.locator(selector);
    return element.evaluate(
      (el, prop) => window.getComputedStyle(el)[prop],
      property,
    );
  }

  async isInViewport(selector: string) {
    const element = this.page.locator(selector);
    return element.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    });
  }
}
