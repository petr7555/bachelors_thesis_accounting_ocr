import React from 'react';
import { create } from 'react-test-renderer';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootTabNavigator } from './RootTabNavigator';

describe('RootTabNavigator', () => {
  test('Default screen is My receipts', async () => {
    const component = (
      <NavigationContainer>
        <RootTabNavigator />
      </NavigationContainer>
    );

    const inst = create(component);
    const textInst = inst.root.findAllByType(Text)[0];
    expect(textInst.props.children).toBe('My receipts');
  });
});
