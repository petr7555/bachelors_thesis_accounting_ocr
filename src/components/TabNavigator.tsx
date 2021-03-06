import React from 'react';
import HomeScreen from './HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen';
import ScanButton, { ScanComponent } from './ScanButton/ScanButton';
import { getNavigationIcon } from '../global/navigation';

const Tab = createBottomTabNavigator();

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
        component={ScanComponent}
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
