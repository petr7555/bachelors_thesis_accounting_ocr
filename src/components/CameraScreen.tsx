import {Alert, Button, View} from 'react-native';
import * as React from 'react';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import vision from '@react-native-firebase/ml-vision';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const processDocument = async (localPath: string) => {
  try {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );

    console.log('Found text in document: ', processed.text);

    processed.blocks.forEach((block) => {
      console.log('Found block with text: ', block.text);
      console.log('Confidence in block: ', block.confidence);
      console.log('Languages found in block: ', block.recognizedLanguages);
    });
  } catch (e) {
    console.log(e);
  }
};

const requestCameraPermission = async () => {
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

const requestStoragePermission = async () => {
  console.log('Requesting permissions...');
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

const CameraScreen = () => {
  const takeAnImage = async () => {
    const cameraPermissionResult = await requestCameraPermission();
    if (cameraPermissionResult === RESULTS.GRANTED) {
      const storagePermissionResult = await requestStoragePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        ImagePicker.openCamera({
          cropping: true,
          freeStyleCropEnabled: true,
          hideBottomControls: true,
        }).then((image) => {
          console.log(image);
          processDocument(image.path);
        });
      }
    }
  };

  const selectImage = async () => {
    const storagePermissionResult = await requestStoragePermission();
    if (storagePermissionResult === RESULTS.GRANTED) {
      ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true,
        hideBottomControls: true,
      }).then((image) => {
        console.log(image);
        processDocument(image.path);
        uploadImage(image);
      });
    }
  };

  const getFilename = (image: Image) => {
    return image.path.split('/').slice(-1)[0];
  };

  const uploadImage = async (image: Image) => {
    try {
      const reference = storage().ref('/receipts/' + getFilename(image));
      const task = await reference.putFile(image.path);
      console.log('Image uploaded to the bucket!');
      const downloadURL = await reference.getDownloadURL();
      console.log('Download url is', downloadURL);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Take an image" onPress={takeAnImage} />
      <Button title="Select from gallery" onPress={selectImage} />
    </View>
  );
};

export default CameraScreen;
