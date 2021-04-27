import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';
import Colors from '../../global/styles/colors';

type Props = {
  icon: string;
  text: string;
  url: string;
};
const TermsLink = ({ icon, text, url }: Props) => {
  return (
    <Pressable style={styles.container} onPress={() => Linking.openURL(url)}>
      <MaterialIcon name={icon} style={styles.icon} />
      <Text style={styles.textStyle}>{text}</Text>
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
    color: Colors.grey,
    fontSize: 19,
    paddingRight: 10,
  },
  textStyle: {
    color: Colors.grey,
    fontSize: 14,
  },
});

export default TermsLink;
