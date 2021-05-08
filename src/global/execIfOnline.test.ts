import NetInfo from '@react-native-community/netinfo';
import execIfOnline from './execIfOnline';

const mockNetInfo = (value: any) => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  NetInfo.fetch.mockReturnValue(Promise.resolve(value));
};

it('executes if connected and internet is reachable', async () => {
  mockNetInfo({ isConnected: true, isInternetReachable: true });

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).toHaveBeenCalled();
});

it('does not execute if not connected', async () => {
  mockNetInfo({ isConnected: false, isInternetReachable: true });

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});

it('does not execute if internet is not reachable', async () => {
  mockNetInfo({ isConnected: true, isInternetReachable: false });

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});

it('does not execute if not connected and internet is not reachable', async () => {
  mockNetInfo({ isConnected: false, isInternetReachable: false });

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});
