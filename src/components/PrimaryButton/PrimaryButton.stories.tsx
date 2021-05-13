import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PrimaryButton from './PrimaryButton';

export const WithText = () => (
  <PrimaryButton
    onPress={action('onPress')}
    title={text('Button text', 'Hello Button')}
  />
);

export const WithEmoji = () => (
  <PrimaryButton onPress={action('onPress')} title="😀 😎 👍 💯 🚀" />
);

storiesOf('PrimaryButton', module)
  .add('With text', WithText)
  .add('With emoji', WithEmoji);

export default {
  title: 'Buttons/PrimaryButton',
};
