import { useNetInfo } from '@react-native-community/netinfo';

/**
 * Do not use when navigating to a different component.
 */
const useConnection = () => {
  const netInfo = useNetInfo();

  const isOffline = !(netInfo.isConnected && netInfo.isInternetReachable);

  return { isOffline };
};

export default useConnection;
