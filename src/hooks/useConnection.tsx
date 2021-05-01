import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

/**
 * Do not use when navigating to a different component.
 */
export const useConnection = () => {
  const [isOffline, setOffline] = useState(false);

  useEffect(() => {
    // TODO useNetInfo
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOffline(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

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
