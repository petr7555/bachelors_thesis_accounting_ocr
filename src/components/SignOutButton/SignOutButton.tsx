import React from 'react';
import { authInstance } from '../../global/firebase';
import Button from '../PrimaryButton/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const googleSignin = Platform.select({
  android: () =>
    require('@react-native-google-signin/google-signin').GoogleSignin,
  default: () => () => null,
})();

const SignOutButton = () => {
  const navigation = useNavigation();

  const signOut = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
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
