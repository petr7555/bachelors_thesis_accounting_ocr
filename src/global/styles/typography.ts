import {TextStyle} from 'react-native';

export type MyTextStyle = TextStyle & {
  primaryColor: string;
  secondaryColor: string;
};

const heading1 = (theme: MyTextStyle): TextStyle => {
  return {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.primaryColor,
    backgroundColor: theme.backgroundColor,
  };
};

const heading2 = (theme: MyTextStyle): TextStyle => ({
  fontSize: 26,
  fontWeight: 'bold',
  lineHeight: 28,
  color: theme.secondaryColor,
  backgroundColor: theme.backgroundColor,
});

const bodyText: TextStyle = {
  fontSize: 18,
  fontWeight: 'normal',
  lineHeight: 21,
  color: 'red',
};

const Typography = (theme: MyTextStyle) => ({
  heading1: heading1(theme),
  heading2: heading2(theme),
  bodyText,
});

export default Typography;
