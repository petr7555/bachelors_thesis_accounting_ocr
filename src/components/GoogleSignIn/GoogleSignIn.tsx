import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { Button, Image } from 'react-native-elements'; // specific import, because GoogleSignin is available only for android yet
import Colors from '../../global/styles/colors';
import googleLogo from '../../../images/google_logo.png';

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
  const { width } = useWindowDimensions();

  const btnGoogleStyle = StyleSheet.flatten([
    styles.button,
    { width: width - 60 },
  ]);

  return (
    <Button
      icon={<Image containerStyle={styles.logo} source={googleLogo} />}
      buttonStyle={btnGoogleStyle}
      titleStyle={styles.text}
      containerStyle={styles.container}
      raised={true}
      onPress={signIn}
      disabled={disabled}
      title="Sign in / Sign up with Google"
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
  },
  container: {
    marginTop: 10,
    position: 'relative',
  },
  logo: {
    height: 26,
    left: 10,
    position: 'absolute',
    width: 26,
  },
  text: {
    color: Colors.grey,
  },
});

export default GoogleSignIn;
