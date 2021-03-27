import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PrimaryButton from './PrimaryButton';

export const withText = () => (
  <PrimaryButton
    onPress={action('clicked-text')}
    title={text('Button text', 'Hello Button')}
  />
);

export const withEmoji = () => (
  <PrimaryButton onPress={action('clicked-emoji')} title="😀 😎 👍 💯 🚀" />
);

storiesOf('PrimaryButton', module)
  .add('with text', withText)
  .add('with emoji', withEmoji);

export default {
  title: 'Buttons/PrimaryButton',
};
