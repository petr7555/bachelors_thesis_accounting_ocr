import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';

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
          <AppNavigator />
        </NavigationContainer>
      </ThemeOptionsContext.Provider>
    </>
  );
};

export default App;
