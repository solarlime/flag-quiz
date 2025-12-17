import { test, expect } from '@playwright/test';
import setRequestResolvers from './helpers/setRequestResolvers';
import createSavedState from './helpers/createSavedState';

test('Should load the only quiz', async ({ page }) => {
  await page.goto('/');
  const mutable = await setRequestResolvers(page);

  const quizLoadButton = page.getByTestId('quiz-load-button');
  await expect(quizLoadButton).toBeDisabled();

  await createSavedState(page);
  await expect(quizLoadButton).toBeEnabled();

  await quizLoadButton.click();
  const score = page.getByTestId('score');
  await expect(score).toContainText('0');

  const question = page.getByTestId('question-number');
  await expect(question).toHaveText('1/2');

  const flag = page.getByTestId('flag');
  await expect(flag).toHaveAttribute(
    'src',
    new RegExp(`${mutable.answerCountryCode}[.]png`),
  );
});

test('Should deal with loading and deleting quizzes', async ({ page }) => {
  await page.goto('/');
  await setRequestResolvers(page);

  const quizLoadButton = page.getByTestId('quiz-load-button');
  await expect(quizLoadButton).toBeDisabled();

  for (let i = 0; i < 2; i += 1) {
    await createSavedState(page);
  }
  await expect(quizLoadButton).toBeEnabled();

  await quizLoadButton.click();
  const sectionTitle = page.getByTestId('section-title');
  await expect(sectionTitle).toContainText('Load');

  const savedStates = page.getByTestId('saved-state');
  await expect(savedStates).toHaveCount(2);

  const savedStateRadio = savedStates.nth(1).getByTestId('saved-state-radio');
  await expect(savedStateRadio).toHaveAttribute('data-state', 'unchecked');

  await savedStateRadio.click();
  await expect(savedStateRadio).toHaveAttribute('data-state', 'checked');

  const savedStateFlagSymbol = await savedStates
    .nth(1)
    .locator('span', { hasText: 'Next flag: ' })
    .textContent()
    .then((text) => text!.split(' ').pop()!);
  const quizStartButton = page.getByTestId('quiz-start-button');
  await expect(quizStartButton).toBeAttached();

  await quizStartButton.click();
  const score = page.getByTestId('score');
  await expect(score).toContainText('0');

  const question = page.getByTestId('question-number');
  await expect(question).toHaveText('1/2');

  const flag = page.getByTestId('flag');
  await expect(flag).toHaveAttribute('data-emoji', savedStateFlagSymbol);

  await page.getByTestId('home-link').click();
  await quizLoadButton.click();

  const loadDeleteSwitcher = page.getByTestId('load-delete-switcher');
  await expect(loadDeleteSwitcher).toHaveAttribute('data-state', 'unchecked');

  await loadDeleteSwitcher.click();
  await expect(loadDeleteSwitcher).toHaveAttribute('data-state', 'checked');
  await expect(sectionTitle).toContainText('Delete');

  const quizDeleteButton = page.getByTestId('quiz-delete-button');
  await quizDeleteButton.click();
  const onlySavedStateRadio = savedStates
    .nth(0)
    .getByTestId('saved-state-radio');
  await expect(onlySavedStateRadio).toBeDisabled();

  await page.waitForTimeout(5000);
  await quizDeleteButton.click();
  await expect(savedStates).toHaveCount(1);
  await expect(onlySavedStateRadio).not.toBeVisible();

  await quizDeleteButton.click();
  await page.waitForTimeout(5000);
  await quizDeleteButton.click();
  await expect(quizLoadButton).toBeDisabled();
});

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
