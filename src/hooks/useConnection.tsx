import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useConnection = () => {
  const [isOffline, setOffline] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOffline(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return [isOffline];
};
