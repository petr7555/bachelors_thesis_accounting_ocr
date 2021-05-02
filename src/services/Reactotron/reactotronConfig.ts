export interface ReactotronConfig {
  /** The name of the app. */
  name?: string;
  /** The host to connect to: default 'localhost'. */
  host?: string;
  /** Should we use async storage */
  useAsyncStorage?: boolean;
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean;
}

/**
 * The default Reactotron configuration.
 */
export const DEFAULT_REACTOTRON_CONFIG: ReactotronConfig = {
  clearOnLoad: true,
  host: 'localhost',
  useAsyncStorage: true,
};
