import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth'; // specific import, because GoogleSignin is available only for android yet

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
    await auth().signInWithCredential(googleCredential);

    console.log('Signed in with Google!');
  } catch (error) {
    console.error(error);
  }
};

interface GoogleSignInProps {
  disabled?: boolean;
}

const GoogleSignIn = ({ disabled }: GoogleSignInProps) => {
  return (
    <GoogleSigninButton
      style={styles.btnGoogle}
      onPress={signIn}
      color={GoogleSigninButton.Color.Light}
      disabled={disabled}
    />
  );
};

const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  btnGoogle: {
    width: WIDTH - 60,
    height: 50,
    marginTop: 20,
  },
});

export default GoogleSignIn;
