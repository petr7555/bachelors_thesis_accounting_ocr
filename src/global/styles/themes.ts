import {useColorScheme} from 'react-native';
import {registerThemes} from 'react-native-themed-styles';
import Colors from './colors';
import {useContext} from 'react';
import {ThemeOptionsContext} from '../../../App';

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
    const defaultTheme = 'light';
    const colorScheme = useColorScheme() || defaultTheme;
    const [themeOption] = useContext(ThemeOptionsContext);
    return themeOption === 'reflectOS'
      ? colorScheme
      : themeOption || defaultTheme;
  },
);
export default styleSheetFactory;
