import React from 'react';
import { create } from 'react-test-renderer';
import { Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

describe('RootNavigator', () => {
  test('Default screen is My receipts', async () => {
    const component = (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    const inst = create(component);
    const textInst = inst.root.findAllByType(Text)[0];
    expect(textInst.props.children).toBe('My receipts');
  });
});
