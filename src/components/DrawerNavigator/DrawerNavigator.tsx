import React from 'react';
import HomeScreen from '../HomeScreen/HomeScreen';
import SettingsScreen from '../SettingsScreen/SettingsScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { getNavigationIcon } from '../../global/navigation';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerType="permanent">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ drawerIcon: getNavigationIcon('home-outline') }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: getNavigationIcon('settings-outline') }}
      />
    </Drawer.Navigator>
  );
};
