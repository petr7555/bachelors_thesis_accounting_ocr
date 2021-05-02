/**
 * Dummy implementations, because NetInfo from '@react-native-community/netinfo' does not work on Windows yet.
 * Will be used only on Windows.
 */

export const useConnection = () => {
  return { isOffline: false };
};

export const execIfOnline = (func: () => void) => func();
