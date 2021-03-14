import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Form from '../Form/Form';

export type ScanStackParamList = {
  Form: { formData: any };
};

const ScanStack = createStackNavigator<ScanStackParamList>();

export const ScanStackNavigator = () => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Form" component={Form} />
    </ScanStack.Navigator>
  );
};
