import Tron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_REACTOTRON_CONFIG,
  ReactotronConfig,
} from './reactotronConfig';

// Teach TypeScript about the bad things we want to do.

type TronType = typeof Tron;

declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: TronType;
  }
}

/** Do Nothing. */
const noop = () => undefined;

// in dev, we attach Reactotron, in prod we attach an interface-compatible mock.
if (__DEV__) {
  // eslint-disable-next-line no-console
  console.tron = Tron; // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneak by our __DEV__ guards, we won't crash.
  // eslint-disable-next-line no-console
  console.tron = {
    // @ts-ignore
    benchmark: noop,
    clear: noop,
    close: noop,
    // @ts-ignore
    configure: noop,
    // @ts-ignore
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    // @ts-ignore
    onCustomCommand: noop,
    overlay: noop,
    reportError: noop,
    send: noop,
    // @ts-ignore
    startTimer: noop,
    // @ts-ignore
    storybookSwitcher: noop,
    // @ts-ignore
    use: noop,
    // @ts-ignore
    useReactNative: noop,
    warn: noop,
  };
}

/**
 * You'll probably never use the service like this since we hang the Reactotron
 * instance off of `console.tron`. This is only to be consistent with the other
 * services.
 */
export class Reactotron {
  config: ReactotronConfig;

  rootStore: any;

  /**
   * Create the Reactotron service.
   *
   * @param config the configuration
   */
  constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
    // merge the passed in config with some defaults
    this.config = {
      host: 'localhost',
      useAsyncStorage: true,
      ...config,
    };
  }

  /**
   * Configure reactotron based on the the config settings passed in, then connect if we need to.
   */
  async setup() {
    // only run this in dev... metro bundler will ignore this block: 🎉
    if (__DEV__) {
      // configure reactotron
      Tron.configure({
        name: this.config.name || require('../../../package.json').name,
        host: this.config.host,
      });

      // hookup middleware
      if (this.config.useAsyncStorage) {
        Tron.setAsyncStorageHandler?.(AsyncStorage);
      }

      Tron.useReactNative({
        asyncStorage: this.config.useAsyncStorage ? undefined : false,
      });

      // connect to the app
      Tron.connect();

      // clear if we should
      if (this.config.clearOnLoad) {
        Tron.clear?.();
      }
    }
  }
}
