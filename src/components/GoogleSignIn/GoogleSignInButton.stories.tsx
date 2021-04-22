import { storiesOf } from '@storybook/react-native';
import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import { action } from '@storybook/addon-actions';

export const enabled = () => (
  <GoogleSignInButton onPress={action('clicked-enabled')} />
);

export const disabled = () => (
  <GoogleSignInButton onPress={action('clicked-disabled')} disabled={true} />
);

storiesOf('GoogleSignInButton', module)
  .add('enabled', enabled)
  .add('disabled', disabled);

export default {
  title: 'Buttons/GoogleSignInButton',
};
