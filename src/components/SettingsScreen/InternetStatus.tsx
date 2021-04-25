import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ThemedIonIcon from '../ThemedIcon/ThemedIonIcon';
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

const InternetStatus = () => {
  const [isOffline] = useConnection();

  return (
    <View style={styles.internetStatus}>
      {isOffline ? (
        <>
          <ThemedIonIcon name="cloud-offline-outline" style={styles.icon} />
          <Text style={styles.text}>No internet connection.</Text>
        </>
      ) : (
        <>
          <ThemedIonIcon name="cloud-done-outline" style={styles.icon} />
          <Text style={styles.text}>You are connected to the internet.</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  internetStatus: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default InternetStatus;
