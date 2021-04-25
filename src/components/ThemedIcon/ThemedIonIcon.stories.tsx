import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ThemedIonIcon from './ThemedIonIcon';
import { StyleSheet } from 'react-native';

export const Basic = () => (
  <ThemedIonIcon name="calendar" style={styles.icon} />
);

storiesOf('ThemedIonIcon', module).add('Basic', Basic);

export default {
  title: 'Icons/ThemedIonIcon',
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 40,
  },
});
