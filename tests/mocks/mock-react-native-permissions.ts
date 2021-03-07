import mockReactNativePermissions from 'react-native-permissions/mock.js';

// https://github.com/zoontek/react-native-permissions
jest.mock('react-native-permissions', () => mockReactNativePermissions);
