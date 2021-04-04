import { Image } from 'react-native-image-crop-picker';

const getFilename = (image: Image) => {
  return image.path.split('/').slice(-1)[0];
};

export default getFilename;
