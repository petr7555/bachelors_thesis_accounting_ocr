import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import InitialRNScreen from './src/components/InitialRNScreen';
import SettingsScreen from './src/components/SettingsScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type ThemeOption = 'reflectOS' | 'light' | 'dark';
type ThemeContextProps = [ThemeOption, Dispatch<SetStateAction<ThemeOption>>];

export const ThemeOptionsContext = createContext<Partial<ThemeContextProps>>(
  [],
);

const App = () => {
  const [themeOption, setThemeOption] = useState<ThemeOption>('reflectOS');

  return (
    <>
      <ThemeOptionsContext.Provider value={[themeOption, setThemeOption]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={InitialRNScreen}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeOptionsContext.Provider>
    </>
  );
};

export default App;
