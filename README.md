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
- `react-native start --projectRoot storybook --reset-cache`
- `npm run android`
- `npm run storybook`

## Troubleshooting
1. Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)
    - solution: `npm start -- --reset-cache`
