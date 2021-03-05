import { AppRegistry } from 'react-native';
import App from './App';
import StorybookUIRoot from './storybook';
import { name as appName } from './app.json';

const showStorybook = false;
AppRegistry.registerComponent(appName, () =>
  showStorybook ? StorybookUIRoot : App,
);
