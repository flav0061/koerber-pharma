# Koerber Pharma - Advanved Search

## Introduction
This project aims to replicate an advanced search bar. The project has a search bar and a toggle that allows the user to alternate between simple and advanved mode.
Simple mode allows the user to type anything in the search bar and when enter is pressed the program adds the searched param in to a suggestions list.
Advanced mode allows a user to make an advanced search query by providing the autocomplete depending where the cursor is. The way this is done is by splitting the query into small parts since it has a repetition and analysing part by part.
**At the moment Vuetify has a bug and the autocomplete is not working properly you can test it by printing the variable**. 

TODO:
- After submitting a query only a small part is being formatted
- Add more tests
- in advanced mode Autocomplete bug in Vuetify that makes suggestions not working
- Move constants in to a proper config file

## Future Improvements
- Form validation -> vuetify
- Internationalization -> i18n

### Dev Stack
- TypeScript
- Eslint
- Unit Test
- Vue 3
- Vuetify

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
