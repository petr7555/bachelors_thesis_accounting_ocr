import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// change to true to show Storybook
// const showStorybook = true;
// AppRegistry.registerComponent(appName, () =>
//   showStorybook ? StorybookUIRoot : App,
// );

// Should we show storybook instead of our app?
// ⚠️ Leave this as `false` when checking into git.
const SWITCH_STORYBOOK_FROM_REACTOTRON = true;
const VISUAL_TESTS = true;

let RootComponent = App;
// // Only include Storybook if we're in dev mode
// if (__DEV__ && SWITCH_STORYBOOK_FROM_REACTOTRON) {
//   const { StorybookUIRoot } = require('./storybook');
//   const Reactotron = require('./src/services/reactotron');
//   const reactotron = new Reactotron.Reactotron();
//   reactotron.setup();
//   RootComponent = console.tron.storybookSwitcher(StorybookUIRoot)(App);
// }
//
// if (__DEV__ && VISUAL_TESTS) {
//   const { StorybookUIRoot } = require('./storybook');
//   RootComponent = StorybookUIRoot;
// }

AppRegistry.registerComponent(appName, () => RootComponent);
