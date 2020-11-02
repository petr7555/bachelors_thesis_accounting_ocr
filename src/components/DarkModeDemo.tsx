import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import Typography, {MyTextStyle} from '../global/styles/typography';
import {useTheme} from 'react-native-themed-styles';
import styleSheetFactory from '../global/styles/themes';

const defaultStyles = styleSheetFactory((theme: MyTextStyle) => {
  return {
    header: {
      ...Typography(theme).heading1,
    },
    subheader: {
      ...Typography(theme).heading2,
    },
    content: {
      ...Typography(theme).bodyText,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
  };
});

const DarkModeDemo = () => {
  const colorScheme = useColorScheme();
  const [styles, theme, themeName] = useTheme(defaultStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Some primary color text</Text>
      <Text style={styles.subheader}>Some secondary color text</Text>
      <Text
        style={
          styles.content
        }>{`Some text that ignores theme. The system color scheme is ${colorScheme}, 
        theme is ${theme}, themeName is ${themeName}`}</Text>
    </View>
  );
};

export default DarkModeDemo;
