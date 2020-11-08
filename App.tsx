import * as React from 'react';
import {Button, Text, useColorScheme, View} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';

import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {TabNavigator} from './src/components/TabNavigator';

const MyDefaultTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#078331',
  },
};

const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#078331',
  },
};

const App = () => {
  const scheme = useColorScheme();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Button title="Sign up" onPress={signUp} />
        <Button title="Sign in" onPress={signIn} />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
