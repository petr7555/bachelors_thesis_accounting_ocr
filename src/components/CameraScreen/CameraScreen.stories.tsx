import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CameraScreen from './CameraScreen';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';
import { action } from '@storybook/addon-actions';

const CameraScreenWithProps = () => (
  <CameraScreen
    setModalVisible={action('setModalVisible')}
    setProcessing={action('setProcessing')}
  />
);

const Basic = () => <MockedNavigator component={CameraScreenWithProps} />;

storiesOf('CameraScreen', module).add('Basic', Basic);
