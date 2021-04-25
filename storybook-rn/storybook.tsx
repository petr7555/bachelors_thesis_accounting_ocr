import React from 'react';
import {
  addDecorator,
  addParameters,
  configure,
  getStorybookUI,
} from '@storybook/react-native';
import 'loki/configure-react-native';
import './rn-addons';
import { withKnobs } from '@storybook/addon-knobs';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';

// enable knobs for all stories
addDecorator(withKnobs);

// enable backgrounds for all stories
addDecorator(withBackgrounds);
addParameters({
  backgrounds: [
    { name: 'white', value: '#fff', default: true },
    { name: 'black', value: '#000' },
  ],
});

// This decorator calls React.createElement and makes it possible to use hooks.
// @ts-ignore
addDecorator((Story) => <Story />);

configure(() => {
  require('./storybook-registry');
}, module);

export const StorybookUIRoot = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-async-storage/async-storage').default || null,
});
