import {Button, Platform} from 'react-native';
import React from 'react';
import {authInstance} from '../global/firebase';

const googleSignin =
  Platform.OS === 'android'
    ? require('@react-native-community/google-signin').GoogleSignin
    : null;

const SignOutButton = () => {
  const signOut = async () => {
    try {
      await authInstance.signOut();
      console.log('User signed out from firebase auth.');
      if (googleSignin) {
        const isSignedIn = await googleSignin.isSignedIn();
        if (isSignedIn) {
          await googleSignin.revokeAccess();
          await googleSignin.signOut();
          console.log('User signed out from Google.');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <Button title="Sign out" onPress={signOut} />;
};

export default SignOutButton;