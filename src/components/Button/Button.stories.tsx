import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import { Text } from 'react-native';
import Button from './Button';

export default {
  title: 'Button',
};

export const WithText = () => (
  <Button onPress={action('clicked-text')}>
    <Text>{text('Button text', 'Hello Button')}</Text>
  </Button>
);

WithText.story = {
  name: 'with text',
};

export const WithSomeEmoji = () => (
  <Button onPress={action('clicked-emoji')}>
    <Text>😀 😎 👍 💯</Text>
  </Button>
);

WithSomeEmoji.story = {
  name: 'with some emoji',
};
