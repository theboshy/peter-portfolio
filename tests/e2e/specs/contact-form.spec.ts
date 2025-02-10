import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/pages/home.page';
import {userData} from "../fixtures/user-data";

test.describe('Contact Form', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickGetInTouch();
  });

  test('should submit form with valid data', async () => {
    await homePage.contactForm.fill(userData.validUser);
    await homePage.contactForm.submit();
    
    await expect(homePage.contactForm.isSubmitting()).toBeTruthy();
    await expect(homePage.contactForm.getSubmitButtonText()).toContain('Sending');
  });

  test('should show validation errors for invalid data', async () => {
    await homePage.contactForm.fill(userData.invalidUser);
    await homePage.contactForm.submit();
    
    const errors = await homePage.contactForm.getErrors();
    expect(errors).toHaveLength(3); // name, email, and message errors
  });

  test('should clear form after successful submission', async () => {
    await homePage.contactForm.fill(userData.validUser);
    await homePage.contactForm.submit();
    
    await expect(homePage.contactForm.nameInput).toHaveValue('');
    await expect(homePage.contactForm.emailInput).toHaveValue('');
    await expect(homePage.contactForm.messageInput).toHaveValue('');
  });
});