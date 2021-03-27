import { Alert, StyleSheet, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { RESULTS } from 'react-native-permissions';
import ImagePicker, {
  Image,
  PickerErrorCode,
} from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../../global/permissions';
import { getTextFromImage } from '../../global/ocr';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../global/styles/colors';
import { getReceiptDataFromImage } from '../../services/FormRecognizerClient/getReceiptDataFromImage';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../RootTabNavigator/RootTabNavigator';
import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import addReceiptToUsersReceipts from '../../api/addReceiptToUsersReceipts';
import { MixedTheme } from '../../../App';
import { getFilename, rgbToHex } from '../../global/utils';
import Button from '../PrimaryButton/PrimaryButton';
import addItemCategories from '../../api/addItemCategories';
import {
  uploadBase64ToFirebaseStorage,
  uploadImageToFirebaseStorage,
} from '../../api/uploadImageToFirebaseStorage';
import transformImage from '../../api/transformImage';

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
      setProcessing(false);
      if (!newReceiptId) {
        Alert.alert('Could not process the image.');
      } else {
        navigation.navigate('Home', {
          screen: 'EditReceipt',
          params: { id: newReceiptId },
        });
      }
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
      const receiptDataWithCategories = await addItemCategories(receiptData);
      return addReceipt(image, receiptDataWithCategories);
    }
  };

  const { colors } = useTheme() as MixedTheme;

  const pickerOptions = {
    cropping: true,
    freeStyleCropEnabled: true,
    hideBottomControls: true,
    compressImageMaxWidth: 720,
    includeBase64: true,
    cropperToolbarTitle: 'Edit photo',
    cropperStatusBarColor: colors.statusBar,
    cropperToolbarColor: rgbToHex(colors.card),
    cropperToolbarWidgetColor: rgbToHex(colors.text),
  };

  const takeAnImage = async () => {
    const cameraPermissionResult = await requestCameraPermission();
    if (cameraPermissionResult === RESULTS.GRANTED) {
      const storagePermissionResult = await requestStoragePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        try {
          return await ImagePicker.openCamera(pickerOptions);
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
        return await ImagePicker.openPicker(pickerOptions);
      } catch (error) {
        console.error(error);
        if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
          Alert.alert("Couldn't select an image from gallery.");
        }
      }
    }
  };

  const addReceipt = async (
    image: Image,
    receiptData: ReceiptData,
  ): Promise<string | undefined> => {
    try {
      const urlOriginal = await uploadImageToFirebaseStorage(image);

      const transformedImage = await transformImage(image);
      if (transformedImage) {
        const urlProcessed = await uploadBase64ToFirebaseStorage(
          transformedImage.image,
          `processed_${getFilename(image)}`,
          transformedImage.mime,
        );

        if (urlOriginal && urlProcessed) {
          return addReceiptToUsersReceipts(
            urlOriginal,
            urlProcessed,
            receiptData,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.modalContent}>
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
  icon: {
    color: Colors.white,
    fontSize: 28,
    left: 40, // Keep some space between your left border and Image
    position: 'absolute',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
});

export default CameraScreen;
