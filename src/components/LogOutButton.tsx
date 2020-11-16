import {Button} from 'react-native';
import React from 'react';
import {auth} from '../global/firebase';

const LogOutButton = () => {
  const logOut = () => {
    auth.signOut().then(() => console.log('User signed out!'));
  };

  return <Button title="Log out" onPress={logOut} />;
};

export default LogOutButton;
