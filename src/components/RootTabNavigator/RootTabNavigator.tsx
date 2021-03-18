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

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Scan: undefined;
  Settings: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

const NullComponent = () => null;

export const RootTabNavigator = () => {
  return (
    <RootTab.Navigator>
      <RootTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'My Receipts',
          tabBarIcon: getNavigationIcon('receipt-outline'),
        }}
      />
      {/* button to go to NullComponent is hidden under the tabBarButton, so it cannot be clicked */}
      <RootTab.Screen
        name="Scan"
        component={NullComponent}
        options={{
          tabBarButton: () => <ScanButton />,
        }}
      />
      <RootTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getNavigationIcon('settings-outline'),
        }}
      />
    </RootTab.Navigator>
  );
};
