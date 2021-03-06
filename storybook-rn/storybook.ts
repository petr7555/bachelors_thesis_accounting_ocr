import { configure, getStorybookUI } from '@storybook/react-native';
import 'loki/configure-react-native';

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
