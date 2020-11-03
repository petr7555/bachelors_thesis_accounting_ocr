import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';

import AppNavigator from '../src/components/AppNavigator';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing AppNavigator', () => {
  test('AppNavigator contains button that navigates to settings screen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    const {findByText} = render(component);

    const header = await findByText('Go to settings');

    expect(header).toBeTruthy();
  });
});
