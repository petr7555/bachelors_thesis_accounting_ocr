import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InitialRNScreen from './InitialRNScreen';
import SettingsScreen from './SettingsScreen';

const {Screen, Navigator} = createStackNavigator();

export default function Navigation() {
  const options = {};

  return (
    <Navigator>
      <Screen name="Home" component={InitialRNScreen} />
      <Screen options={options} name="Settings" component={SettingsScreen} />
    </Navigator>
  );
}
