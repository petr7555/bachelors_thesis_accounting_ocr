import NetInfo from '@react-native-community/netinfo';

const isOffline = () =>
  NetInfo.fetch().then(
    (state) => !(state.isConnected && state.isInternetReachable),
  );

export default isOffline;
