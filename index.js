import { AppRegistry } from 'react-native';
import App from './App';
import StorybookUIRoot from './storybook';
import { name as appName } from './app.json';

// change to true to show Storybook
const showStorybook = true;
AppRegistry.registerComponent(appName, () =>
  showStorybook ? StorybookUIRoot : App,
);
