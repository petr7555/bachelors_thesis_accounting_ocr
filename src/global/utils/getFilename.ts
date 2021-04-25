import { MyImage } from '../../components/CameraScreen/CameraScreen';

// TODO test new functionality
const getFilename = (image: MyImage) => {
  const pathSeparator = image.path.includes('\\') ? '\\' : '/';
  return image.path.split(pathSeparator).slice(-1)[0];
};

export default getFilename;
