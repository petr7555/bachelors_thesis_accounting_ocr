import React, { useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Button from '../PrimaryButton/PrimaryButton';

import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { authInstance, FirebaseError } from '../../global/firebase';
import bgImage from '../../../images/background.png';
import EmailValidator from 'email-validator';
import Colors from '../../global/styles/colors';
import { isWindows } from '../../global/utils/platform';

const GoogleSignIn = Platform.select({
  android: () => require('../GoogleSignIn/GoogleSignIn').default,
  default: () => () => null,
})();

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { control, handleSubmit, errors } = useForm<FormData>({
    mode: 'all',
  });
  const [showPass, setShowPass] = useState(false);
  const [signInInProgress, setSignInInProgress] = useState(false);
  const [signUpInProgress, setSignUpInProgress] = useState(false);

  const handleAuthError = (error: FirebaseError) => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('This email address is already in use.');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Invalid email address.');
    }

    if (error.code === 'auth/user-not-found') {
      Alert.alert('The entered email address does not belong to any account.');
    }

    if (error.code === 'auth/wrong-password') {
      Alert.alert('You entered wrong password.');
    }

    console.error(error);
  };

  const signIn = async (data: FormData) => {
    setSignInInProgress(true);
    try {
      await authInstance.signInWithEmailAndPassword(data.email, data.password);
      console.log('User signed in.');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setSignInInProgress(false);
    }
  };

  const signUp = async (data: FormData) => {
    setSignUpInProgress(true);
    try {
      await authInstance.createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('User account created & signed in!');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setSignUpInProgress(false);
    }
  };

  const passwordInput = useRef<TextInput>(null);

  const { width } = useWindowDimensions();

  const inputSectionStyle = StyleSheet.flatten([
    styles.inputSection,
    { width: width - 60 },
  ]);

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Icon style={styles.logo} name="scan" />
        <Text style={styles.logoText}>Receipts scanner</Text>
      </View>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={inputSectionStyle}>
            <Icon style={styles.inputIcon} name="person-circle" />
            <TextInput
              style={[styles.input, styles.emailInput]}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
              placeholder="Email"
              accessibilityLabel="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordInput.current && passwordInput.current.focus();
              }}
            />
          </View>
        )}
        name="email"
        defaultValue=""
        rules={{
          required: true,
          validate: (input) =>
            EmailValidator.validate(input) ? undefined : 'Invalid email format',
        }}
      />
      {errors.email && (
        <Text style={styles.validationErrorText}>
          {errors.email.message || 'This field is required'}
        </Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={inputSectionStyle}>
            <MaterialIcon style={styles.inputIcon} name="lock" />
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
              secureTextEntry={!showPass}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              accessibilityLabel="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              ref={passwordInput}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(signIn)}
            />
            <Pressable
              style={styles.btnEye}
              onPressIn={() => setShowPass(true)}
              onPressOut={() => setShowPass(false)}>
              {({ pressed }: PressableStateCallbackType) => (
                <MaterialIcon
                  style={styles.eyeIcon}
                  name="eye"
                  color={pressed ? 'rgba(255,255,255,0.7)' : Colors.white}
                />
              )}
            </Pressable>
          </View>
        )}
        name="password"
        defaultValue=""
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        }}
      />
      {errors.password && (
        <Text>{errors.password.message || 'This field is required'}</Text>
      )}
      <Button
        containerStyle={styles.btnSignInContainer}
        onPress={handleSubmit(signIn)}
        loading={signInInProgress}
        disabled={signUpInProgress}
        title="Sign in"
      />
      <Button
        containerStyle={styles.btnSignUpContainer}
        onPress={handleSubmit(signUp)}
        title="Sign up"
        loading={signUpInProgress}
        disabled={signInInProgress}
      />
      <GoogleSignIn disabled={signInInProgress || signUpInProgress} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEye: {
    paddingLeft: 8,
    paddingRight: 20,
  },
  btnSignInContainer: {
    marginTop: 20,
  },
  btnSignUpContainer: {
    marginTop: 10,
  },
  emailInput: {
    marginRight: 50,
  },
  eyeIcon: {
    fontSize: 24,
  },
  input: {
    color: isWindows ? Colors.black : Colors.white,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: {
    color: Colors.white,
    fontSize: 24,
    paddingLeft: 12,
    paddingRight: 8,
  },
  inputSection: {
    alignItems: 'center',
    backgroundColor: Colors.transparentBlack,
    borderRadius: 25,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
  },
  logo: {
    // width: 120,
    // height: 120,
    color: Colors.white,
    fontSize: 120,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 40,
    marginTop: 10,
  },
  validationErrorText: {
    marginBottom: 5,
  },
});

export default LoginScreen;
