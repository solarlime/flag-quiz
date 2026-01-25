import { Page } from '@playwright/test';

const createSavedState = async (page: Page, shouldReturnHome = true) => {
  await page.getByTestId('quiz-new-button').click();
  await page.getByTestId('questions-quantity-input').fill('2');
  await page.getByTestId('quiz-start-button').click();
  await page.getByTestId('quiz-save-button').click();
  if (shouldReturnHome) {
    await page.getByTestId('home-link').click();
  }
};

export default createSavedState;
