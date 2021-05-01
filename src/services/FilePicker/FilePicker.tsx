import { NativeModules } from 'react-native';
import { MyImage } from '../../components/Camera/Camera';

type FilePickerType = {
  pickFile(): Promise<MyImage>;
};

const { FilePicker } = NativeModules;

export default FilePicker as FilePickerType;
