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
import { isWindows } from '../../global/utils/platform';

export type RootParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Scan: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

const NullComponent = () => null;

const RootNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: 49 + 3 },
        labelStyle: { paddingBottom: 3 },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'My Receipts',
          tabBarIcon: getNavigationIcon('receipt-outline'),
        }}
      />
      {/* button to go to NullComponent is hidden under the tabBarButton, so it cannot be clicked */}
      {!isWindows && (
        <Tab.Screen
          name="Scan"
          component={NullComponent}
          options={{
            tabBarButton: () => <ScanButton />,
          }}
        />
      )}
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
