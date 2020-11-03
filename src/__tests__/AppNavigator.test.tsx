import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';
import {TabNavigator} from '../../App';

// TODO is this needed?
// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing TabNavigator', () => {
  test('TabNavigator contains button that navigates to settings screen', async () => {
    const component = (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );

    const {findByText} = render(component);

    const header = await findByText('Settings');

    expect(header).toBeTruthy();
  });

  test('clicking on Settings button takes you to the Settings screen', async () => {
    const component = (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );

    const {findByText} = render(component);
    const toClick = await findByText('Settings');

    fireEvent.press(toClick);
    const settingsScreenLabel = await findByText('Settings!');

    expect(settingsScreenLabel).toBeTruthy();
  });
});
