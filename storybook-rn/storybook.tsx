import React from 'react';
import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';
import 'loki/configure-react-native';
import './rn-addons';
import { withKnobs } from '@storybook/addon-knobs';

configure(() => {
  // enable knobs for all stories
  addDecorator(withKnobs);
  // This decorator calls React.createElement and makes it possible to use hooks.
  // @ts-ignore
  addDecorator((Story) => <Story />);
  require('./storybook-registry');
}, module);

export const StorybookUIRoot = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-async-storage/async-storage').default || null,
});
