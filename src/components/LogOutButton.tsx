import {Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../App.windows';

const LogOutButton = () => {
  const auth = useContext(AuthContext);
  const logOut = () => {
    auth.signOut().then(() => console.log('User signed out!'));
  };

  return <Button title="Log out" onPress={logOut} />;
};

export default LogOutButton;
