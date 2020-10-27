import {useColorScheme} from 'react-native';
import {registerThemes} from 'react-native-themed-styles';
import Colors from './colors';

const styleSheetFactory = registerThemes(
  {
    light: {
      backgroundColor: 'white',
      primaryColor: Colors.primary.light,
      secondaryColor: Colors.secondary.light,
    },
    dark: {
      backgroundColor: 'black',
      primaryColor: Colors.primary.dark,
      secondaryColor: Colors.secondary.dark,
    },
  },
  () => {
    const colorScheme = useColorScheme();
    return colorScheme || 'light';
  },
);

export default styleSheetFactory;
