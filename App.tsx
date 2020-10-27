// needs to be first import
// https://reactnative.dev/docs/navigation#react-navigation
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitialRNScreen from './src/components/InitialRNScreen';
import SettingsScreen from './src/components/SettingsScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={InitialRNScreen}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
