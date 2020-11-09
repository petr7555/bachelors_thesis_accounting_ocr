import * as React from 'react';
import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TabNavigator} from './src/components/TabNavigator';
import LoginForm from './src/components/LoginForm';
import Colors from './src/global/styles/colors';
import User = FirebaseAuthTypes.User;

const MyDefaultTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
  },
};

const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.primary,
  },
};

const App = () => {
  const scheme = useColorScheme();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  // Handle user state changes
  function onAuthStateChanged(user: User | null) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
