import { renderHook } from '@testing-library/react-hooks';
import useConnection from './useConnection';
import { useNetInfo } from '@react-native-community/netinfo';

const mockNetInfo = (value: any) => {
  jest.mock('@react-native-community/netinfo');

  // @ts-ignore
  useNetInfo.mockReturnValue(value);
};

it('should return online if connected and internet is reachable', async () => {
  mockNetInfo({ isConnected: true, isInternetReachable: true });

  const { result } = renderHook(() => useConnection());

  expect(result.current.isOffline).toBe(false);
});

it('should return offline if not connected', async () => {
  mockNetInfo({ isConnected: false, isInternetReachable: true });

  const { result } = renderHook(() => useConnection());

  expect(result.current.isOffline).toBe(true);
});

it('should return offline if internet is not reachable', async () => {
  mockNetInfo({ isConnected: true, isInternetReachable: false });

  const { result } = renderHook(() => useConnection());

  expect(result.current.isOffline).toBe(true);
});

it('should return offline if not connected and internet is not reachable', async () => {
  mockNetInfo({
    isConnected: false,
    isInternetReachable: false,
  });

  const { result } = renderHook(() => useConnection());

  expect(result.current.isOffline).toBe(true);
});
