import React from 'react';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getNavigationIcon } from '../../global/navigation';
import { StyleSheet } from 'react-native';
import { RootParamList } from './RootNavigator';
import { HomeStackNavigator } from '../HomeStackNavigator/HomeStackNavigator';

const Drawer = createDrawerNavigator<RootParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerType="permanent" drawerStyle={styles.drawer}>
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'My Receipts',
          drawerIcon: getNavigationIcon('receipt-outline'),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: getNavigationIcon('settings-outline'),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: 220,
  },
});

export default DrawerNavigator;
