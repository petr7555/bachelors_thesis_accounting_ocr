import { Alert, StyleSheet, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { RESULTS } from 'react-native-permissions';
import ImagePicker, { PickerErrorCode } from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../../global/permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../global/styles/colors';
import { getReceiptDataFromImage } from '../../services/FormRecognizerClient/getReceiptDataFromImage';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../RootNavigator/RootNavigator';
import addReceiptToUsersReceipts from '../../api/addReceiptToUsersReceipts';
import { MixedTheme } from '../../../App';
import Button from '../PrimaryButton/PrimaryButton';
import addItemCategories from '../../api/addItemCategories';
import {
  uploadBase64ToFirebaseStorage,
  uploadImageToFirebaseStorage,
} from '../../api/uploadImageToFirebaseStorage';
import transformImage from '../../api/transformImage';
import rgbToHex from '../../global/utils/rgbToHex';
import getFilename from '../../global/utils/getFilename';
import { isWindows } from '../../global/utils/platform';

type HomeNavigationProp = StackNavigationProp<RootParamList, 'Home'>;

type Props = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setProcessing: Dispatch<SetStateAction<boolean>>;
};

export type MyImage = {
  path: string;
  mime: string;
  data: string;
};

const CameraScreen = ({ setModalVisible, setProcessing }: Props) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const prefillForm = async (image?: MyImage) => {
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

  const processImage = async (image: MyImage): Promise<string | undefined> => {
    try {
      const receiptDataWithCategoriesPromise = getReceiptDataFromImage(
        image,
      ).then((receiptData) => {
        if (receiptData) {
          return addItemCategories(receiptData);
        }
      });
      const urlOriginalPromise = uploadImageToFirebaseStorage(image);
      const urlProcessedPromise = transformImage(image).then(
        (transformedImage) => {
          if (transformedImage) {
            return uploadBase64ToFirebaseStorage(
              transformedImage.image,
              `processed_${getFilename(image)}`,
              transformedImage.mime,
            );
          }
        },
      );

      const receiptDataWithCategories = await receiptDataWithCategoriesPromise;
      const urlOriginal = await urlOriginalPromise;
      const urlProcessed = await urlProcessedPromise;

      if (receiptDataWithCategories && urlOriginal && urlProcessed) {
        return addReceiptToUsersReceipts(
          urlOriginal,
          urlProcessed,
          receiptDataWithCategories,
        );
      }
    } catch (error) {
      console.error(error);
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

  const takeAnImage = async (): Promise<MyImage | undefined> => {
    const cameraPermissionResult = await requestCameraPermission();
    if (cameraPermissionResult === RESULTS.GRANTED) {
      const storagePermissionResult = await requestStoragePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        try {
          return (await ImagePicker.openCamera(pickerOptions)) as MyImage;
        } catch (error) {
          console.error(error);
          if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
            Alert.alert("Couldn't take a new image.");
          }
        }
      }
    }
  };

  const selectImageFromGallery = async (): Promise<MyImage | undefined> => {
    const storagePermissionResult = await requestStoragePermission();
    if (storagePermissionResult === RESULTS.GRANTED) {
      try {
        return (await ImagePicker.openPicker(pickerOptions)) as MyImage;
      } catch (error) {
        console.error(error);
        if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
          Alert.alert("Couldn't select an image from gallery.");
        }
      }
    }
  };

  return (
    <View style={styles.modalContent}>
      {!isWindows && (
        <Button
          containerStyle={styles.buttonContainer}
          title="Take an image"
          onPress={addNewImage}
          icon={<Icon style={styles.icon} name="camera-outline" />}
        />
      )}
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
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
});

export default CameraScreen;
