import getFilename from '../global/utils/getFilename';
import { MyImage } from '../components/CameraScreen/CameraScreen';
import { Alert } from 'react-native';
import { storageInstance } from '../global/firebase';

export const uploadImageToFirebaseStorage = async (
  image: MyImage,
): Promise<string | undefined> => {
  try {
    const imageName = getFilename(image);
    const reference = storageInstance.ref(`/receipts/${imageName}`);

    await reference.putFile(image.path);
    console.log(`Image ${imageName} uploaded to firebase storage.`);

    const downloadUrl = await reference.getDownloadURL();
    console.log(`Download url for image is ${downloadUrl}`);

    return downloadUrl;
  } catch (error) {
    console.error(error);
    Alert.alert('Upload to Firebase Storage failed');
  }
};

export const uploadBase64ToFirebaseStorage = async (
  base64String: string,
  imageName: string,
  mime: string,
): Promise<string | undefined> => {
  try {
    const reference = storageInstance.ref('/receipts/' + imageName);

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
};
