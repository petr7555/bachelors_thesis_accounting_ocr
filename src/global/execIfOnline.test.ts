import NetInfo from '@react-native-community/netinfo';
import execIfOnline from './execIfOnline';

it('executes if connected and internet is reachable', async () => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  NetInfo.fetch.mockReturnValue(
    Promise.resolve({ isConnected: true, isInternetReachable: true }),
  );

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).toHaveBeenCalled();
});

it('does not execute if not connected', async () => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  NetInfo.fetch.mockReturnValue(
    Promise.resolve({ isConnected: false, isInternetReachable: true }),
  );

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});

it('does not execute if internet is not reachable', async () => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  NetInfo.fetch.mockReturnValue(
    Promise.resolve({ isConnected: true, isInternetReachable: false }),
  );

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});

it('does not execute if not connected and internet is not reachable', async () => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  NetInfo.fetch.mockReturnValue(
    Promise.resolve({ isConnected: false, isInternetReachable: false }),
  );

  const fn = jest.fn();
  await execIfOnline(fn);

  expect(fn).not.toHaveBeenCalled();
});
