// needs to be first import
// https://reactnative.dev/docs/navigation#react-navigation
import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, Text, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';
import {TabNavigator} from './src/components/TabNavigator';
import LoginForm from './src/components/LoginForm';
import Colors from './src/global/styles/colors';
import {useAuthState} from 'react-firebase-hooks/auth';
import {authInstance, firestoreInstance} from './src/global/firebase';

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
  const [user, loading, error] = useAuthState(authInstance);

  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      firestoreInstance
        .collection('Users')
        .doc(userUid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            console.log('User with uid', userUid, 'exists');
          } else {
            console.log('Creating User document with uid', userUid);
            firestoreInstance
              .collection('Users')
              .doc(userUid)
              .set({
                name: user.displayName,
                email: user.email,
              })
              .then(() => {
                console.log('User added!');
              });
          }
        });
    }
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error!</Text>;
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
