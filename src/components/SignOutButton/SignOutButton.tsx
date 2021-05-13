import React from 'react';
import { authInstance } from '../../global/firebase';
import Button from '../PrimaryButton/PrimaryButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { isWindows } from '../../global/utils/platform';
import { LOG } from '../../services/Logger/logger';

const googleSignIn = Platform.select({
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
      LOG.info('User signed out from firebase auth.');
      if (!isWindows) {
        const isSignedIn = await googleSignIn.isSignedIn();
        if (isSignedIn) {
          await googleSignIn.revokeAccess();
          await googleSignIn.signOut();
          LOG.info('User signed out from Google.');
        }
      }
    } catch (error) {
      LOG.error(error);
    }
  };

  return <Button title="Sign out" onPress={signOut} />;
};

export default SignOutButton;
