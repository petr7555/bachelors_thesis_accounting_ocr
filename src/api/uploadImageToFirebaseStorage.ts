import { Image } from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import getFilename from '../global/utils/getFilename';

export const uploadImageToFirebaseStorage = async (
  image: Image,
): Promise<string | undefined> => {
  try {
    const imageName = getFilename(image);
    const reference = storage().ref(`/receipts/${imageName}`);

    await reference.putFile(image.path);
    console.log(`Image ${imageName} uploaded to firebase storage.`);

    const downloadUrl = await reference.getDownloadURL();
    console.log(`Download url for image is ${downloadUrl}`);

    return downloadUrl;
  } catch (error) {
    console.error(error);
  }
};

export const uploadBase64ToFirebaseStorage = async (
  base64String: string,
  imageName: string,
  mime: string,
): Promise<string | undefined> => {
  try {
    const reference = storage().ref('/receipts/' + imageName);

    await reference.putString(base64String, 'base64', {
      contentType: mime,
    });
    console.log(`Image ${imageName} uploaded to firebase storage.`);

    const downloadUrl = await reference.getDownloadURL();
    console.log(`Download url for image is ${downloadUrl}`);

    return downloadUrl;
  } catch (error) {
    console.error(error);
  }
};
