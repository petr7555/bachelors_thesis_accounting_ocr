![react-native-android-build-apk](https://github.com/petr7555/bachelors_thesis_accounting_ocr/workflows/react-native-android-build-apk/badge.svg)

Web version of Storybook is deployed to https://bachelors-thesis-accounting-ocr.vercel.app/ with each push to GitHub.
This is not part of GitHub Actions but Vercel's own repository hook.

Run on Windows:

```bash
npm run windows
```

Run on Android:

```bash
npm run android
```

This command starts Metro bundler and Android emulator automatically.

## Run E2E tests locally

- `npm run start` start Metro bundler. We need it because debug version of app is run.
- `npm run e2e:build`
- `npm run e2e:test`
- troubleshooting:
  - `npm run start --reset-cache`
  - make sure the **App** is visible and not Storybook

On CI, a release version of the app is built, so the Metro bundler is not needed.

## Run Storybook for React Native

- `npm run android`
- `npm run storybook:rn`
- refresh app in metro bundler, components should be now visible in a browser in the sidebar
- it is only possible to navigate through them in the browser, the component itself is shown on a mobile device /
  emulator

## Run visual regression Loki tests for React Native:

- `npm run android`
- `npm run storybook:rn`
- refresh app in metro bundler, components should be now visible in a browser in the sidebar
- `npm run loki:update:rn` to create reference images
- `npm run loki:test:rn` to create new images and compare to reference images
- ⚠️ set `const VISUAL_TESTS = true;` in `index.js`, this reduces flakiness
- ⚠️ there is still a lot of flakiness, many elements interfere the snapshots

## Run visual regression Loki tests for React Native Web:

- `npm run storybook:web`
- `npm run loki:update:web` to create reference images
- `npm run loki:test:web` to create new images and compare to reference images

## Run visual regression Storycap / Reg suit tests for React Native Web:

- `npm run storycap:web` takes screenshots and saves them to `__screenshots__`
- `npm run reg-suit:web:dev` **dev**, as opposed to **ci**, exports path to Google application credentials file
- `visual-test:web:dev` is a shortcut for the two commands above

## Serve Storybook from static files

- build: `npm run build-storybook:web`
- serve: `npm run serve-storybook:web`

Project uses Google Cloud Platform

- https://console.cloud.google.com/home/dashboard?folder=&organizationId=&project=bachelorsthesisaccountingocr

## Troubleshooting

1. Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)
   - solution: `npm start -- --reset-cache`
2. If you have multiple connections in Reactotron, switch to the right one to be able to control Storybook
