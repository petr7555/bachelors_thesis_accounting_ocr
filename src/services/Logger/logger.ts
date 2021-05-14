import { logger, consoleTransport, sentryTransport } from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

const LOG = logger.createLogger({
  transport: (props) => {
    // log to console only in dev mode
    if (__DEV__) {
      consoleTransport(props);
    }
    // send WARN and higher to Sentry
    if (props.level.severity >= 2) {
      sentryTransport(props);
    }
  },
  severity: __DEV__ ? 'debug' : 'error',
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    colors: 'ansi',
    SENTRY: Sentry,
  },
});

export { LOG };
