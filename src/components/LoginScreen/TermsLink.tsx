import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import Colors from '../../global/styles/colors';
import { useTheme } from 'react-native-elements';
import { isWindows } from '../../global/utils/platform';

type Props = {
  icon: string;
  text: string;
  url: string;
};
const TermsLink = ({ icon, text, url }: Props) => {
  const { theme } = useTheme();

  // Always grey on Android, change based on theme on Windows
  const color = isWindows ? theme.colors?.grey0 : Colors.grey;

  const textStyle = StyleSheet.flatten([styles.textStyle, { color }]);
  const iconStyle = StyleSheet.flatten([styles.icon, { color }]);

  return (
    <Pressable style={styles.container} onPress={() => Linking.openURL(url)}>
      <MaterialIcon name={icon} style={iconStyle} />
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 19,
    paddingRight: 10,
  },
  textStyle: {
    fontSize: 14,
  },
});

export default TermsLink;
