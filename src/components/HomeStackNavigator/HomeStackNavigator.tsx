import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import EditReceipt from '../EditReceipt/EditReceipt';
import Items from '../Items/Items';

export type HomeStackParamList = {
  HomeScreen: undefined;
  EditReceipt: { id: string };
  Items: { id: string };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'My receipts' }}
      />
      <HomeStack.Screen
        name="EditReceipt"
        component={EditReceipt}
        options={{ title: 'Edit receipt' }}
      />
      <HomeStack.Screen
        name="Items"
        component={Items}
        options={{ title: 'Items' }}
      />
    </HomeStack.Navigator>
  );
};
