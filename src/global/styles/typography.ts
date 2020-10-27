import Colors from './colors';
import {TextStyle} from 'react-native';

const heading1: TextStyle = {
  fontSize: 30,
  fontWeight: 'bold',
  lineHeight: 32,
  color: Colors.primary,
};

const heading2: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
  lineHeight: 28,
  color: Colors.secondary,
};

const bodyText: TextStyle = {
  fontSize: 18,
  fontWeight: 'normal',
  lineHeight: 21,
  color: Colors.red,
};

const Typography = {
  heading1,
  heading2,
  bodyText,
};

export default Typography;
