import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import Form from '../Form/Form';
import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Form: { receiptData: ReceiptData };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Form" component={Form} />
    </HomeStack.Navigator>
  );
};
