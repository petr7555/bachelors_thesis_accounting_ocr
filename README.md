![react-native-android-build-apk](https://github.com/petr7555/bachelors_thesis_accounting_ocr/workflows/react-native-android-build-apk/badge.svg)

Run on Windows:

```bash
npm run windows
```

Run on Android:

```bash
npm run android
```

This command starts Metro bundler and Android emulator automatically.

## Run visual regression Loki tests:
- `npm run android`
- `npm run storybook`
- refresh app in metro bundler

## Troubleshooting
1. Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)
    - solution: `npm start -- --reset-cache`
2. If you have multiple connections in Reactotron, 
   switch to the right one to be able to control Storybook
