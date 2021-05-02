import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const execIfOnline = (func: () => void) => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected && state.isInternetReachable) {
      func();
    } else {
      Alert.alert('No internet connection');
    }
  });
};

export default execIfOnline;
