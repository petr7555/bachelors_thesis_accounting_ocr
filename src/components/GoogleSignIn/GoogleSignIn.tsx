import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { auth, authInstance } from '../../global/firebase';
import GoogleSignInButton from './GoogleSignInButton';

GoogleSignin.configure({
  webClientId:
    '729638290812-k2lom3dbvbgu84o4a7i33e7me05c0012.apps.googleusercontent.com',
});

const signIn = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    await authInstance.signInWithCredential(googleCredential);

    console.log('Signed in with Google!');
  } catch (error) {
    console.error(error);
  }
};

interface GoogleSignInProps {
  disabled?: boolean;
}

const GoogleSignIn = ({ disabled = false }: GoogleSignInProps) => {
  return <GoogleSignInButton onPress={signIn} disabled={disabled} />;
};

export default GoogleSignIn;
