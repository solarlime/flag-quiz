import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { RawResult } from '../src/interfaces/data';

test('Should pass the quiz', async ({ page }) => {
  await page.goto('/');

  await page.route(
    'https://restcountries.com/v3.1/all?fields=name,cca2,flag,continents,independent',
    (route) =>
      route.fulfill({
        status: 200,
        headers: {},
        contentType: 'application/json',
        path: './tests/mocks/mock_countries.json',
      }),
  );

  let answerCountryCode: string | undefined;

  await page.route('https://flagcdn.com/**/*.webp', (route, request) => {
    const url = request.url();
    const countryCodeFile = url.split('/').pop();
    answerCountryCode = countryCodeFile.split('.')[0];
    return route.fulfill({
      status: 200,
      headers: {},
      contentType: 'image/webp',
      path: `./tests/mocks/${countryCodeFile}`,
    });
  });

  const quizStartButton = page.getByTestId('quiz-start-button');
  await expect(quizStartButton).toBeEnabled();

  await quizStartButton.click();

  const score = page.getByTestId('score');
  await expect(score).toContainText('0');

  const question = page.getByTestId('question-number');
  await expect(question).toHaveText('1/2');

  const flag = page.getByTestId('flag');
  await expect(flag).toHaveAttribute(
    'src',
    new RegExp(`${answerCountryCode}[.]png`),
  );

  const countries = JSON.parse(
    await readFile('./tests/mocks/mock_countries.json', 'utf-8'),
  );

  const country1 = countries.find(
    (c: RawResult) => c.cca2.toLowerCase() === answerCountryCode,
  );

  const countryButton = page.getByText(country1.name.common);
  await expect(countryButton).toBeVisible();

  await countryButton.click();

  await expect(score).toContainText('1');
  await expect(question).toHaveText('2/2');

  const country2 = countries.find(
    (c: RawResult) => c.cca2.toLowerCase() === answerCountryCode,
  );

  const wrongCountryButton = page
    .getByTestId('answer-variant')
    .filter({ hasNotText: country2.name.common })
    .first();
  await wrongCountryButton.click();

  await expect(page.getByTestId('quiz-result')).toContainText(
    '1 time out of 2',
  );
  await expect(flag).toHaveAttribute(
    'src',
    new RegExp(`${answerCountryCode}[.]png`),
  );
  const mistake = page.getByTestId('mistake');
  await expect(mistake).toContainText(
    `Correct answer: ${country2.name.common}`,
  );
  await expect(mistake).not.toContainText(
    `Your answer: ${country2.name.common}`,
  );
});
