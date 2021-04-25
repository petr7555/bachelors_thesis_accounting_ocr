import { NativeModules } from 'react-native';
import { MyImage } from '../../components/CameraScreen/CameraScreen';

type FilePickerType = {
  pickFile(): MyImage;
};

const { FilePicker } = NativeModules;

export default FilePicker as FilePickerType;
