import getFilename from '../global/utils/getFilename';
import { authInstance } from '../global/firebase';
import { RECEIPTS_STORAGE, USERS_STORAGE } from './constants';
import { MyImage } from '../components/CameraScreen/CameraScreen';
import { Alert } from 'react-native';
import { storageInstance } from '../global/firebase';

export const uploadImageToFirebaseStorage = async (
  image: MyImage,
): Promise<string | undefined> => {
  const user = authInstance.currentUser;
  if (user) {
    try {
      const imageName = getFilename(image);
      const reference = storageInstance.ref(
        `${USERS_STORAGE}/${user.uid}/${RECEIPTS_STORAGE}/${imageName}`,
      );

      await reference.putFile(image.path);
      console.log(`Image ${imageName} uploaded to firebase storage.`);

      const downloadUrl = await reference.getDownloadURL();
      console.log(`Download url for image is ${downloadUrl}`);

      return downloadUrl;
    } catch (error) {
      console.error(error);
      Alert.alert('Upload to Firebase Storage failed');
    }
  }
};

export const uploadBase64ToFirebaseStorage = async (
  base64String: string,
  imageName: string,
  mime: string,
): Promise<string | undefined> => {
  const user = authInstance.currentUser;
  if (user) {
    try {
      const reference = storageInstance.ref(
        `${USERS_STORAGE}/${user.uid}/${RECEIPTS_STORAGE}/${imageName}`,
      );

      await reference.putString(base64String, 'base64', {
        contentType: mime,
      });
      console.log(`Image ${imageName} uploaded to firebase storage.`);

      const downloadUrl = await reference.getDownloadURL();
      console.log(`Download url for image is ${downloadUrl}`);

      return downloadUrl;
    } catch (error) {
      console.error(error);
      Alert.alert('Upload to Firebase Storage failed');
    }
  }
};
