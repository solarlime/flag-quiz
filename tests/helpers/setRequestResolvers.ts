import { Page, Request, Route } from '@playwright/test';

const setRequestResolvers = async (page: Page) => {
  // I cannot return answerCountryCode (will be a static value), but returning an object brings a link to a mutable value
  const mutable: { answerCountryCode?: string } = {};

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

  await page.route('https://flagcdn.com/w640/ad.png', (route) =>
    route.fulfill({
      status: 200,
      headers: {},
      contentType: 'application/json',
      body: Buffer.from([]),
    }),
  );

  await page.route(
    'https://flagcdn.com/**/*.webp',
    (route: Route, request: Request) => {
      const url = request.url();
      const countryCodeFile = url.split('/').pop();
      mutable.answerCountryCode = countryCodeFile!.split('.')[0];
      return route.fulfill({
        status: 200,
        headers: {},
        contentType: 'image/webp',
        path: `./tests/mocks/${countryCodeFile}`,
      });
    },
  );

  return mutable;
};

export default setRequestResolvers;
