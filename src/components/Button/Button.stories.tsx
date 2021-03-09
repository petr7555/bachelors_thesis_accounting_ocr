import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Button from './Button';

export const withText = () => (
  <Button onPress={action('clicked-text')}>
    <Text>{text('Button text', 'Hello Button')}</Text>
  </Button>
);

export const withEmoji = () => (
  <Button onPress={action('clicked-emoji')}>
    <Text>😀 😎 👍 💯 🚀 </Text>
  </Button>
);

storiesOf('Button', module)
  .add('with text', withText)
  .add('with emoji', withEmoji);

export default {
  title: 'Buttons/BaseButtons',
};
