import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

// Unfortunately React Native does not support dynamic imports
// so we have to list all stories in 'stories/index.js'.
configure(() => {
  require('./stories');
}, module);

// Refer to https://www.npmjs.com/package/@storybook/react-native
// to find allowed options for getStorybookUI.
const StorybookUIRoot = getStorybookUI({ asyncStorage: null });

export default StorybookUIRoot;
