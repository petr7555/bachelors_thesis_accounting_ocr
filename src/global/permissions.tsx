import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Alert } from 'react-native';

export const requestCameraPermission = async () => {
  console.log('Requesting permissions...');
  const result = await request(PERMISSIONS.ANDROID.CAMERA);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      Alert.alert(
        'Camera permission must be granted.',
        "Please allow this app to use your device's camera",
      );
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      Alert.alert(
        'Camera permission must be granted.',
        "Please go to system settings and allow this app to use your device's camera.",
      );
      break;
  }
  return result;
};

export const requestStoragePermission = async () => {
  console.log('Requesting permission to READ_EXTERNAL_STORAGE');
  const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      Alert.alert(
        'Storage must be enabled',
        "Please allow this app to use your device's storage",
      );
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      Alert.alert(
        'Storage must be enabled.',
        "Please allow this app to use your device's storage in the system settings.",
      );
      break;
  }
  return result;
};
