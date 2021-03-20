import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import Form from '../Form/Form';
import Items from '../Items/Items';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Form: { id: string };
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
        name="Form"
        component={Form}
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
