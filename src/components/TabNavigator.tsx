import React from 'react';
import HomeScreen from './HomeScreen';
import NewReceiptScreen from './NewReceiptScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraScreen from './CameraScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: getTabBarIcon('camera-outline'),
        }}
      />
      <Tab.Screen
        name="New receipt"
        component={NewReceiptScreen}
        options={{
          tabBarIcon: getTabBarIcon('scan'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
};
