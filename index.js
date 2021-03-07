import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Ignore log notification by message start
LogBox.ignoreLogs(['AsyncStorage has been extracted']);
// Emitted by running Loki visual tests
LogBox.ignoreLogs(['console.disableYellowBox']);
//Ignore all log notifications
// LogBox.ignoreAllLogs();

// Should we show storybook instead of our app?
// ⚠️ Leave this as `false` when checking into git.
const SWITCH_STORYBOOK_FROM_REACTOTRON = true;
const VISUAL_TESTS = false;

let RootComponent = App;
// Only include Storybook if we're in dev mode
if (__DEV__ && SWITCH_STORYBOOK_FROM_REACTOTRON) {
  const { StorybookUIRoot } = require('./.storybook-rn');
  const Reactotron = require('./src/services/reactotron');
  const reactotron = new Reactotron.Reactotron();
  reactotron.setup();
  RootComponent = console.tron.storybookSwitcher(StorybookUIRoot)(App);
}

if (__DEV__ && VISUAL_TESTS) {
  const { StorybookUIRoot } = require('./.storybook-rn');
  RootComponent = StorybookUIRoot;
}

AppRegistry.registerComponent(appName, () => RootComponent);
