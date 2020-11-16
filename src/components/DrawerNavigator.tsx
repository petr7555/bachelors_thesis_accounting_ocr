import React from 'react';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './SettingsScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerType="permanent">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{drawerIcon: getTabBarIcon('home-outline')}}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{drawerIcon: getTabBarIcon('settings-outline')}}
      />
    </Drawer.Navigator>
  );
};
