// needs to be first import
// https://reactnative.dev/docs/navigation#react-navigation
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  useColorScheme,
} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';
import { RootTabNavigator } from './src/components/RootTabNavigator/RootTabNavigator';
import LoginScreen from './src/components/LoginScreen/LoginScreen';
import Colors from './src/global/styles/colors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from './src/global/firebase';
import { ThemeProvider } from 'react-native-elements';
import createUser from './src/api/createUser';
import SplashScreen from 'react-native-splash-screen';

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

const { width: WIDTH } = Dimensions.get('window');

const theme = {
  // you can override react-native-elements' components' styles here
  Button: {
    buttonStyle: {
      width: WIDTH - 60,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.secondary,
    },
    containerStyle: {
      borderRadius: 25,
    },
  },
};

const App = () => {
  const scheme = useColorScheme();
  const [user, loading, error] = useAuthState(authInstance);

  useEffect(() => {
    createUser(user);
    SplashScreen.hide();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <ThemeProvider theme={theme} useDark={scheme === 'dark'}>
      <NavigationContainer
        theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
        {user ? <RootTabNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
