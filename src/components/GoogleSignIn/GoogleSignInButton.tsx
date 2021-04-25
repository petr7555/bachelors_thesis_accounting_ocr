import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { Button, Image } from 'react-native-elements';
import Colors from '../../global/styles/colors';
import googleLogo from '../../../images/google_logo.png';

interface GoogleSignInProps {
  onPress: () => void;
  disabled?: boolean;
}

const GoogleSignInButton = ({
  onPress,
  disabled = false,
}: GoogleSignInProps) => {
  const { width } = useWindowDimensions();
  const btnGoogleStyle = StyleSheet.flatten([
    styles.button,
    { width: width - 60 },
  ]);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    { width: width - 60 },
  ]);

  return (
    <Button
      icon={<Image containerStyle={styles.logo} source={googleLogo} />}
      buttonStyle={btnGoogleStyle}
      titleStyle={styles.text}
      containerStyle={containerStyle}
      raised={true}
      onPress={onPress}
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

export default GoogleSignInButton;
