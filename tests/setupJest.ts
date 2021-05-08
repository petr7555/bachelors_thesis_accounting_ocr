// libraries to mock
import './mocks/mock-async-storage';
import './mocks/mock-native-animated-helper';
import './mocks/mock-native-event-emitter';
import './mocks/mock-react-native-permissions';
import './mocks/mock-react-native-netinfo';
import './mocks/mock-react-native-fs';

// this mock would be used if we accessed #react-native-firebase from tests,
// but since we access web firebase, it is not needed
// import './mocks/mock-react-native-firebase';

// maybe in the future -> https://reactnavigation.org/docs/testing/

// https://github.com/facebook/jest/issues/6434#issuecomment-525576660
jest.useFakeTimers();
