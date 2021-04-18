// needs to be the first import
// https://reactnative.dev/docs/navigation#react-navigation
if (!isWindows) {
  require('react-native-gesture-handler');
}
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';
import RootNavigator from './src/components/RootNavigator/RootNavigator';
import LoginScreen from './src/components/LoginScreen/LoginScreen';
import Colors from './src/global/styles/colors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from './src/global/firebase';
import { ThemeProvider } from 'react-native-elements';
import createUser from './src/api/createUser';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from 'react-native-fast-toast';
import { isAndroid, isWindows } from './src/global/utils/platform';

type CommonTheme = {
  colors: {
    primary: string;
    statusBar: string;
  };
};

type CustomTheme = {
  colors: {
    secondary: string;
  };
};

export type MixedTheme = Theme & CommonTheme & CustomTheme;

const commonTheme: CommonTheme = {
  colors: {
    primary: Colors.primary,
    statusBar: Colors.statusBar,
  },
};

const MyDefaultTheme: MixedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...commonTheme.colors,
    secondary: Colors.secondary,
  },
};

const MyDarkTheme: MixedTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...commonTheme.colors,
    secondary: Colors.secondaryDarkMode,
  },
};

const androidInputStyle = isAndroid && {
  paddingBottom: 0,
};

const windowsInputStyle = isWindows && {
  color: null,
};

const theme = {
  // you can override react-native-elements' components' styles here
  Input: {
    inputStyle: {
      ...androidInputStyle,
      ...windowsInputStyle,
    },
  },
};

const App = () => {
  // useColorScheme() will always return 'light' when remote debugging.
  // set this to 'dark' or build using --release to test dark mode
  // const scheme = 'dark';
  const scheme = useColorScheme();
  const [user, loading, error] = useAuthState(authInstance);

  useEffect(() => {
    createUser(user);
    SplashScreen?.hide();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <ToastProvider
      placement="bottom"
      offset={90}
      successColor={Colors.primary}
      textStyle={isWindows && styles.toastFixWindows}
      iconContainerStyle={isWindows && styles.toastFixWindows}>
      <ThemeProvider theme={theme} useDark={scheme === 'dark'}>
        <NavigationContainer
          theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
          {user ? <RootNavigator /> : <LoginScreen />}
        </NavigationContainer>
      </ThemeProvider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  toastFixWindows: {
    top: -19,
  },
});

export default App;
