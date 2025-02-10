import {Locator, type Page} from '@playwright/test';
import { BasePage } from '../base.page';
import { NavigationComponent } from '../components/navigation.component';
import { ContactFormComponent } from '../components/contact-form.component';
import { CommandConsoleComponent } from '../components/command-console.component';

export class HomePage extends BasePage {
  readonly navigation: NavigationComponent;
  readonly contactForm: ContactFormComponent;
  readonly commandConsole: CommandConsoleComponent;
  readonly getInTouchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.contactForm = new ContactFormComponent(page);
    this.commandConsole = new CommandConsoleComponent(page);
    this.getInTouchButton = page.getByRole('link', { name: /get in touch/i });
  }

  async clickGetInTouch() {
    await this.getInTouchButton.click();
    await this.waitForScroll('#contact-section');
  }

  async verifySection(sectionId: string) {
    const section = this.page.locator(sectionId);
    return this.isInViewport(section);
  }

  async verifyResponsiveLayout(viewport: { width: number; height: number }) {
    await this.page.setViewportSize(viewport);
    return {
      isNavigationVisible: await this.navigation.navLinks.isVisible(),
      isHeroTextReadable: await this.getComputedStyle('section:first-child', 'fontSize'),
      isGridResponsive: await this.getComputedStyle('.grid', 'gridTemplateColumns')
    };
  }
}