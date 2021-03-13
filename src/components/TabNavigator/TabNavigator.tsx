import React from 'react';
import HomeScreen from '../HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import ScanButton, { ScanComponent } from '../ScanButton/ScanButton';
import { getNavigationIcon } from '../../global/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Form from '../Form/Form';

const Tab = createBottomTabNavigator();

const CameraStack = createStackNavigator();

function CameraScreen() {
  return (
    <CameraStack.Navigator>
      {/*<CameraStack.Screen*/}
      {/*  name="B"*/}
      {/*  component={null}*/}
      {/*  options={{ tabBarLabel: 'Scan!' }}*/}
      {/*/>*/}
      <CameraStack.Screen
        name="Form"
        component={Form}
        options={{ tabBarLabel: 'Form!' }}
      />
    </CameraStack.Navigator>
  );
}

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getNavigationIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={CameraScreen}
        options={{
          tabBarButton: () => <ScanButton />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getNavigationIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
};
