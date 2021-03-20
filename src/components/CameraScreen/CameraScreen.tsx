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
import addImageToUsersReceipts from '../../api/addImageToUsersReceipts';

type HomeNavigationProp = StackNavigationProp<RootTabParamList, 'Home'>;

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setProcessing: Dispatch<SetStateAction<boolean>>;
};

const CameraScreen = ({ setModalVisible, setProcessing }: Props) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const prefillForm = async (image?: Image) => {
    if (image) {
      setModalVisible(false);
      setProcessing(true);
      const newReceiptId = await processImage(image);
      if (!newReceiptId) {
        Alert.alert('Could not process the image.');
        return;
      }
      setProcessing(false);
      navigation.navigate('Home', {
        screen: 'Form',
        params: { id: newReceiptId },
      });
    }
  };

  const addNewImage = async () => {
    const image = await takeAnImage();
    await prefillForm(image);
  };

  const addExistingImage = async () => {
    const image = await selectImageFromGallery();
    await prefillForm(image);
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
      console.log(`Download url is ${downloadURL}`);

      return addImageToUsersReceipts(downloadURL, receiptData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      <Button
        containerStyle={styles.buttonContainer}
        title="Take an image"
        onPress={addNewImage}
        icon={<Icon style={styles.icon} name="camera-outline" />}
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Select from gallery"
        onPress={addExistingImage}
        icon={<Icon style={styles.icon} name="images-outline" />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
  icon: {
    color: Colors.white,
    fontSize: 28,
    left: 40, // Keep some space between your left border and Image
    position: 'absolute',
  },
});

export default CameraScreen;
