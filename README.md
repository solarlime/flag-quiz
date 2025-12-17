[![CI](https://github.com/solarlime/flag-quiz/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/solarlime/flag-quiz/actions/workflows/main.yml)

# Flaq (ex. Flag quiz)

### What:

It's a simple app helping to learn the flags of the countries.

### Features:

- Light and dark modes
- Uses [Flagcdn](https://flagcdn.com) public API to get flags (with a fallback)
- Uses [Restcountries](https://restcountries.com) public API to get information about countries (with a fallback to a local JSON file)
- All mistakes are shown at the end
- Quizzes can be saved, restored
- Saved states are validated; corrupted ones can be deleted, as can correct ones
- Uses MobX for state management
- Rendered with React and radix-ui primitives
- Styled with styled-components
- Supports all modern browsers on desktop, Android & iOS 12+
- Tested with Playwright

Try it on [Vercel](https://flaq.solarlime.dev/)!
