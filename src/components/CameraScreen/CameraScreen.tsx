import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import React, { Dispatch, SetStateAction } from 'react';
import { RESULTS } from 'react-native-permissions';

import ImagePicker, {
  Image,
  PickerErrorCode,
} from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {
  authInstance,
  firestore,
  firestoreInstance,
} from '../../global/firebase';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../../global/permissions';
import { getTextFromImage } from '../../global/ocr';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../global/styles/colors';
import { getReceiptDataFromImage } from '../../services/FormRecognizerClient/getReceiptDataFromImage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../RootTabNavigator/RootTabNavigator';
import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { RECEIPTS, USERS } from '../../api/constants';

type HomeNavigationProp = StackNavigationProp<RootTabParamList, 'Home'>;

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const CameraScreen = ({ setModalVisible }: Props) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const prefillForm = async (image: Image) => {
    const newReceiptId = await processImage(image);
    if (!newReceiptId) {
      Alert.alert('Could not process the image.');
      return;
    }
    setModalVisible(false);
    navigation.navigate('Home', {
      screen: 'Form',
      params: { id: newReceiptId },
    });
  };

  const addNewImage = async () => {
    const image = await takeAnImage();
    if (image) {
      await prefillForm(image);
    }
  };

  const addExistingImage = async () => {
    const image = await selectImageFromGallery();
    if (image) {
      await prefillForm(image);
    }
  };

  const processImage = async (image: Image): Promise<string | undefined> => {
    await getTextFromImage(image.path);
    const receiptData = await getReceiptDataFromImage(image);
    if (receiptData) {
      return uploadImage(image, receiptData);
    }
  };

  const takeAnImage = async () => {
    const cameraPermissionResult = await requestCameraPermission();
    if (cameraPermissionResult === RESULTS.GRANTED) {
      const storagePermissionResult = await requestStoragePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        try {
          return await ImagePicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            hideBottomControls: true,
            includeBase64: true,
          });
        } catch (error) {
          console.error(error);
          if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
            Alert.alert("Couldn't take a new image.");
          }
        }
      }
    }
  };

  const selectImageFromGallery = async () => {
    const storagePermissionResult = await requestStoragePermission();
    if (storagePermissionResult === RESULTS.GRANTED) {
      try {
        return await ImagePicker.openPicker({
          cropping: true,
          freeStyleCropEnabled: true,
          hideBottomControls: true,
          compressImageMaxWidth: 720,
          includeBase64: true,
        });
      } catch (error) {
        console.error(error);
        if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
          Alert.alert("Couldn't select an image from gallery.");
        }
      }
    }
  };

  const getFilename = (image: Image) => {
    return image.path.split('/').slice(-1)[0];
  };

  const uploadImage = async (
    image: Image,
    receiptData: ReceiptData,
  ): Promise<string | undefined> => {
    try {
      const reference = storage().ref('/receipts/' + getFilename(image));

      await reference.putFile(image.path);
      console.log('Image uploaded to firebase storage.');

      const downloadURL = await reference.getDownloadURL();
      console.log('Download url is', downloadURL);

      return addImageToUsersReceipts(downloadURL, receiptData);
    } catch (error) {
      console.error(error);
    }
  };

  const addImageToUsersReceipts = async (
    downloadURL: string,
    receiptData: ReceiptData,
  ): Promise<string | undefined> => {
    const user = authInstance.currentUser;
    if (user != null) {
      try {
        const result = await firestoreInstance
          .collection(USERS)
          .doc(user.uid)
          .collection(RECEIPTS)
          .add({
            url: downloadURL,
            // @ts-ignore
            added: firestore.Timestamp.now(),
            ...receiptData,
          });
        console.log('Receipt added!');
        return result.id;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.content}>
      <Button
        containerStyle={styles.buttonContainer}
        title="Take an image"
        onPress={addNewImage}
        icon={
          <Icon
            style={styles.icon}
            name="camera-outline"
            size={28}
            color="white"
          />
        }
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Select from gallery"
        onPress={addExistingImage}
        icon={
          <Icon
            style={styles.icon}
            name="images-outline"
            size={28}
            color="white"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.primary,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    left: 40, // Keep some space between your left border and Image
  },
});

export default CameraScreen;
