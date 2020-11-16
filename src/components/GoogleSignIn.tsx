import {GoogleSignin} from '@react-native-community/google-signin';
import {Button} from 'react-native';
import React from 'react';
import {auth} from '../global/firebase';

GoogleSignin.configure({
  webClientId:
    '729638290812-k2lom3dbvbgu84o4a7i33e7me05c0012.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth.signInWithCredential(googleCredential);
}

const GoogleSignIn = () => {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('Signed in with Google!'))
          .catch((error) => console.log(error))
      }
    />
  );
};

export default GoogleSignIn;
