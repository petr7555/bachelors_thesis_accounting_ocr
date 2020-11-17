import {Button} from 'react-native';
import React from 'react';
import {authInstance} from '../global/firebase';

const LogOutButton = () => {
  const logOut = () => {
    authInstance.signOut().then(() => console.log('User signed out!'));
  };

  return <Button title="Log out" onPress={logOut} />;
};

export default LogOutButton;
