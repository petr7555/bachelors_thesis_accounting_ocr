// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// https://github.com/invertase/react-native-firebase/issues/4265#issuecomment-752718664
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// https://github.com/zoontek/react-native-permissions
jest.mock('react-native-permissions', () => {
  return require('react-native-permissions/mock.js');
});

// https://github.com/facebook/jest/issues/6434#issuecomment-525576660
jest.useFakeTimers();
