import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/pages/home.page';

test.describe('Command Console', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.commandConsole.open();
  });

  test('should execute show source command', async () => {
    await homePage.commandConsole.executeCommand('show source');
    const output = await homePage.commandConsole.getOutput();
    expect(output).toContain('Source code repository');
  });

  test('should handle invalid commands', async () => {
    await homePage.commandConsole.executeCommand('invalid-command');
    const output = await homePage.commandConsole.getOutput();
    expect(output).toContain('Command not found');
  });

  test('should minimize and restore console', async () => {
    await homePage.commandConsole.minimize();
    await expect(homePage.commandConsole.isVisible()).toBeFalsy();
    
    await homePage.commandConsole.open();
    await expect(homePage.commandConsole.isVisible()).toBeTruthy();
  });
});