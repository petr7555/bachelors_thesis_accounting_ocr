// needs to be first import
// https://reactnative.dev/docs/navigation#react-navigation
import 'react-native-gesture-handler';
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
import firestore from '@react-native-firebase/firestore';

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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    if (user !== null) {
      const userUid = user.uid;
      firestore()
        .collection('Users')
        .doc(userUid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            console.log('User with uid', userUid, 'exists');
          } else {
            console.log('Creating User document with uid', userUid);
            firestore()
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
  };

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
