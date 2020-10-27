import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Typography from '../global/styles/typography';

const DarkModeDemo = () => {
  return (
    <View>
      <Text style={styles.header}>Some primary color text</Text>
      <Text style={styles.subheader}>Some secondary color text</Text>
      <Text style={styles.content}>Some text that ignores theme</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...Typography.heading1,
    backgroundColor: 'white',
  },
  subheader: {
    ...Typography.heading2,
  },
  content: {
    ...Typography.bodyText,
  },
});
export default DarkModeDemo;
