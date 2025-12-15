import { test, expect } from '@playwright/test';

test('Should deal with corrupted quizzes', async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('savedState', 'value');
  });
  await page.goto('/');

  const quizLoadButton = page.getByTestId('quiz-load-button');
  await expect(quizLoadButton).toBeEnabled();

  const warningIcon = quizLoadButton.getByTestId('icon-warning');
  await expect(warningIcon).toBeAttached();

  await quizLoadButton.click();
  const deleteCorruptedButton = page.getByTestId('delete-corrupted-button');
  await expect(deleteCorruptedButton).toBeEnabled();

  await deleteCorruptedButton.click();
  const deleteCorruptedCancelButton = page.getByTestId('delete-cancel-button');
  await expect(deleteCorruptedButton).toBeDisabled();
  await expect(deleteCorruptedButton).toBeAttached();

  await deleteCorruptedCancelButton.click();
  await expect(deleteCorruptedButton).toBeEnabled();
  await expect(deleteCorruptedCancelButton).not.toBeAttached();

  await deleteCorruptedButton.click();
  await expect(deleteCorruptedButton).toContainText('Confirm');

  await page.waitForTimeout(5000);
  await expect(deleteCorruptedButton).toContainText('now');
  await expect(deleteCorruptedButton).toBeEnabled();

  await deleteCorruptedButton.click();
  await expect(deleteCorruptedButton).toContainText('Successfully deleted');
  await expect(deleteCorruptedButton).not.toBeAttached();

  await page.getByTestId('home-link').click();
  await expect(warningIcon).not.toBeAttached();
});
