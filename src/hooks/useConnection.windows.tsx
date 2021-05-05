/**
 * Dummy implementation, because NetInfo from '@react-native-community/netinfo' does not work on Windows yet.
 * Will be used only on Windows.
 */

const useConnection = () => {
  return { isOffline: false };
};

export default useConnection;
