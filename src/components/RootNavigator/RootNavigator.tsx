import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import ScanButton from '../ScanButton/ScanButton';
import { getNavigationIcon } from '../../global/navigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  HomeStackNavigator,
  HomeStackParamList,
} from '../HomeStackNavigator/HomeStackNavigator';

export type RootParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Scan: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

const NullComponent = () => null;

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'My Receipts',
          tabBarIcon: getNavigationIcon('receipt-outline'),
        }}
      />
      {/* button to go to NullComponent is hidden under the tabBarButton, so it cannot be clicked */}
      <Tab.Screen
        name="Scan"
        component={NullComponent}
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

export default RootNavigator;
