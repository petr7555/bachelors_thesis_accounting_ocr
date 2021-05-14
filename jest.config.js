module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|@react-native-firebase/(.*)|@loki|@sentry/react-native|some-custom-package)',
  ],
  setupFiles: [
    '<rootDir>/tests/setupJest.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleNameMapper: {
    '\\.(ttf)$': '<rootDir>/tests/mocks/fileMock.ts',
  },
};
