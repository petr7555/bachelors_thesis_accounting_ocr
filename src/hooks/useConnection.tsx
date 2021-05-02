import { Alert } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

/**
 * Do not use when navigating to a different component.
 */
export const useConnection = () => {
  const netInfo = useNetInfo();

  const isOffline = !(netInfo.isConnected && netInfo.isInternetReachable);

  return [isOffline];
};

export const execIfOnline = (func: () => void) => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected && state.isInternetReachable) {
      func();
    } else {
      Alert.alert('No internet connection');
    }
  });
};
