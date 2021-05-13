import { logger, consoleTransport, sentryTransport } from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

const LOG = logger.createLogger({
  transport: (props) => {
    if (__DEV__) {
      consoleTransport(props);
    }
    sentryTransport(props);
  },
  transportOptions: {
    colors: 'ansi',
    SENTRY: Sentry,
  },
});

export { LOG };
