import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CameraScreen from './CameraScreen';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';

const CameraScreenWithProps = () => (
  <CameraScreen setModalVisible={() => {}} setProcessing={() => {}} />
);

const basic = () => <MockedNavigator component={CameraScreenWithProps} />;

storiesOf('CameraScreen', module).add('basic', basic);
