// libraries to mock
import './mocks/mock-async-storage';
import './mocks/mock-native-animated-helper';
import './mocks/mock-native-event-emitter';
import './mocks/mock-react-native-permissions';

// https://github.com/facebook/jest/issues/6434#issuecomment-525576660
jest.useFakeTimers();
