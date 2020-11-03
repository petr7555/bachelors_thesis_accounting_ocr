import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import AppNavigator from '../components/AppNavigator';

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

  test('clicking on Go to settings button takes you to the settings screen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    const {findByText} = render(component);
    const toClick = await findByText('Go to settings');

    fireEvent.press(toClick);
    const settingsScreenLabel = await findByText('This is Settings screen');

    expect(settingsScreenLabel).toBeTruthy();
  });
});
