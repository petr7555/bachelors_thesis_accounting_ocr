import { storiesOf } from '@storybook/react-native';
import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import { action } from '@storybook/addon-actions';

export const Enabled = () => <GoogleSignInButton onPress={action('onPress')} />;

export const Disabled = () => (
  <GoogleSignInButton onPress={action('onPress')} disabled={true} />
);

storiesOf('GoogleSignInButton', module)
  .add('Enabled', Enabled)
  .add('Disabled', Disabled);

export default {
  title: 'Buttons/GoogleSignInButton',
};
