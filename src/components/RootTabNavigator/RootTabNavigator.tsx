import React from 'react';
import HomeScreen from '../HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import ScanButton from '../ScanButton/ScanButton';
import { getNavigationIcon } from '../../global/navigation';
import {
  ScanStackNavigator,
  ScanStackParamList,
} from '../ScanStackNavigator/ScanStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Scan: NavigatorScreenParams<ScanStackParamList>;
  Settings: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

export const RootTabNavigator = () => {
  return (
    <RootTab.Navigator>
      <RootTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getNavigationIcon('home-outline'),
        }}
      />
      {/* button to go to ScanScreen is hidden under the tabBarButton, so it cannot be clicked */}
      <RootTab.Screen
        name="Scan"
        component={ScanStackNavigator}
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
