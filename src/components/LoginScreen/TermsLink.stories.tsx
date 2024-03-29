import { storiesOf } from '@storybook/react-native';
import React from 'react';
import TermsLink from './TermsLink';
import { PRIVACY_POLICY_URL } from '../../global/constants';

export const Basic = () => (
  <TermsLink
    icon="shield-account"
    text="Privacy Policy"
    url={PRIVACY_POLICY_URL}
  />
);

storiesOf('TermsLink', module).add('Basic', Basic);

export default {
  title: 'TermsLink',
};
