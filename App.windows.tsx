import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {useAuthState} from 'react-firebase-hooks/auth';
import LoginForm from './src/components/LoginForm';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/components/DrawerNavigator';
import {auth} from './src/global/firebase';

const App = () => {
  const [user, loading, error] = useAuthState(auth);

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
    return <LoginForm />;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
export default App;
