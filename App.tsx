import * as React from 'react';
import {Button, Text, useColorScheme, View} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import NewReceiptScreen from './src/components/NewReceiptScreen';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';
import HomeScreen from './src/components/HomeScreen';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const CameraScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Camera!</Text>
    </View>
  );
};

const SettingsScreen = () => {
  const {colors} = useTheme();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Settings!</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  );
};

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

const Tab = createBottomTabNavigator();

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

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: getTabBarIcon('camera-outline'),
        }}
      />
      <Tab.Screen
        name="New receipt"
        component={NewReceiptScreen}
        options={{
          tabBarIcon: getTabBarIcon('scan'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
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
