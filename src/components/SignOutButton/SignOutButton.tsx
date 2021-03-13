import { Platform } from 'react-native';
import React from 'react';
import { authInstance } from '../../global/firebase';
import { Button } from 'react-native-elements';

const googleSignin =
  Platform.OS === 'android'
    ? require('@react-native-google-signin/google-signin').GoogleSignin
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
    } catch (error) {
      console.error(error);
    }
  };

  return <Button title="Sign out" onPress={signOut} />;
};

export default SignOutButton;
