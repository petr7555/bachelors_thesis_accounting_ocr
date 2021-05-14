import getFilename from '../../global/utils/getFilename';
import { authInstance } from '../../global/firebase';
import { RECEIPTS_STORAGE, USERS_STORAGE } from '../../global/constants';
import { MyImage } from '../../components/Camera/Camera';
import { Alert } from 'react-native';
import { storageInstance } from '../../global/firebase';
import base64ToArrayBuffer from 'base64-arraybuffer';
import { LOG } from '../../services/Logger/logger';

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

      const binaryImageData = base64ToArrayBuffer.decode(image.data);

      // putString() does not fork with Firebase for Web
      // [FirebaseError: Firebase Storage: String does not match format 'base64': Invalid character found (storage/invalid-format)]
      // putFile() is available only in React Native Firebase
      // React Native does not support Blob
      // use therefore ArrayBuffer and put() method
      await reference.put(binaryImageData, { contentType: image.mime });
      LOG.info(`Image ${imageName} uploaded to firebase storage.`);

      const downloadUrl = await reference.getDownloadURL();
      LOG.info(`Download url for image is ${downloadUrl}`);

      return downloadUrl;
    } catch (error) {
      LOG.error(error);
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

      const binaryImageData = base64ToArrayBuffer.decode(base64String);

      await reference.put(binaryImageData, { contentType: mime });
      LOG.info(`Image ${imageName} uploaded to firebase storage.`);

      const downloadUrl = await reference.getDownloadURL();
      LOG.info(`Download url for image is ${downloadUrl}`);

      return downloadUrl;
    } catch (error) {
      LOG.error(error);
      Alert.alert('Upload to Firebase Storage failed');
    }
  }
};
