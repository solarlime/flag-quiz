import { test, expect } from '@playwright/test';

test('Should change the theme and save it', async ({ page }) => {
  await page.goto('/');
  const themeSwitcher = page.getByTestId('theme-switcher');
  await expect(themeSwitcher).toHaveAttribute('data-value', 'light');

  await themeSwitcher.click();
  await expect(themeSwitcher).toHaveAttribute('data-value', 'dark');

  await page.reload();
  await expect(themeSwitcher).toHaveAttribute('data-value', 'dark');

  await themeSwitcher.click();
  await expect(themeSwitcher).toHaveAttribute('data-value', 'light');

  await page.reload();
  await expect(themeSwitcher).toHaveAttribute('data-value', 'light');
});
