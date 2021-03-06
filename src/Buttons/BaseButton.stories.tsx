import React from 'react';
import { BaseButton } from './BaseButton';
import { StyleSheet, Text } from 'react-native';
import { action } from '@storybook/addon-actions';

const styles = StyleSheet.create({
  text: { padding: 8 },
});

const Story = () => (
  <>
    <BaseButton onPress={action('onPress')}>
      <Text style={styles.text}>Click Me!</Text>
    </BaseButton>
    <BaseButton
      onPress={action('onPress')}
      leadingComponent={<Text>{'\u2714'}</Text>}>
      <Text style={styles.text}>With Leading Component</Text>
    </BaseButton>
    <BaseButton
      onPress={action('onPress')}
      tailingComponent={<Text>{'\u2714'}</Text>}>
      <Text style={styles.text}>With Tailing Component</Text>
    </BaseButton>
  </>
);

export const light = () => <Story />;

export const dark = () => <Story />;

export default {
  title: 'Buttons/BaseButton',
};
