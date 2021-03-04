import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginScreen from './src/components/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/components/DrawerNavigator';
import { authInstance } from './src/global/firebase';

const App = () => {
  const [user, loading, error] = useAuthState(authInstance);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
export default App;
