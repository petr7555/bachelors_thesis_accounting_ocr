import {Alert, Button, View} from 'react-native';
import React from 'react';
import {RESULTS} from 'react-native-permissions';

import ImagePicker, {Image} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {authInstance, firestore, firestoreInstance} from '../global/firebase';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../global/permissions';
import {getTextFromImage} from '../global/ocr';

const CameraScreen = () => {
  const addNewImage = async () => {
    const image = await takeAnImage();
    if (image) {
      await processImage(image);
    }
  };

  const addExistingImage = async () => {
    const image = await selectImageFromGallery();
    if (image) {
      await processImage(image);
    }
  };

  const processImage = async (image: Image) => {
    await getTextFromImage(image.path);
    await uploadImage(image);
  };

  const takeAnImage = async () => {
    const cameraPermissionResult = await requestCameraPermission();
    if (cameraPermissionResult === RESULTS.GRANTED) {
      const storagePermissionResult = await requestStoragePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        try {
          const image = await ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            hideBottomControls: true,
          });
          console.log(image);

          return image;
        } catch (error) {
          console.log(error);
          Alert.alert("Couldn't take a new image.");
        }
      }
    }
  };

  const selectImageFromGallery = async () => {
    const storagePermissionResult = await requestStoragePermission();
    if (storagePermissionResult === RESULTS.GRANTED) {
      try {
        const image = await ImagePicker.openPicker({
          cropping: true,
          freeStyleCropEnabled: true,
          hideBottomControls: true,
          compressImageMaxWidth: 720,
        });
        console.log('Got image from gallery:');
        console.log(image);

        return image;
      } catch (error) {
        console.log(error);
        Alert.alert("Couldn't select an image from gallery.");
      }
    }
  };

  const getFilename = (image: Image) => {
    return image.path.split('/').slice(-1)[0];
  };

  const uploadImage = async (image: Image) => {
    try {
      const reference = storage().ref('/receipts/' + getFilename(image));

      const task = await reference.putFile(image.path);
      console.log('Image uploaded to firebase storage.');

      const downloadURL = await reference.getDownloadURL();
      console.log('Download url is', downloadURL);

      await addImageToUsersReceipts(downloadURL);
    } catch (error) {
      console.log(error);
    }
  };

  const addImageToUsersReceipts = async (downloadURL: string) => {
    const user = authInstance.currentUser;
    if (user != null) {
      try {
        await firestoreInstance
          .collection('Users')
          .doc(user.uid)
          .collection('receipts')
          .add({
            url: downloadURL,
            // @ts-ignore
            added: firestore.Timestamp.now(),
          });
        console.log('Receipt added!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Take an image" onPress={addNewImage} />
      <Button title="Select from gallery" onPress={addExistingImage} />
    </View>
  );
};
export default CameraScreen;
