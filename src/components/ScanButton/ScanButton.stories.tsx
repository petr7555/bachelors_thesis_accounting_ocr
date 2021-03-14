import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScanButton from './ScanButton';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';

storiesOf('ScanButton', module).add('default', () => (
  <MockedNavigator component={ScanButton} />
));
