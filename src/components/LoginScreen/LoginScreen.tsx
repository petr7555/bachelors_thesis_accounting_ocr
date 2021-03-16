import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';

import { Controller, useForm } from 'react-hook-form';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { authInstance, FirebaseError } from '../../global/firebase';
import bgImage from '../../../images/background.png';
import EmailValidator from 'email-validator';

const GoogleSignIn = Platform.select({
  android: () => require('../GoogleSignIn/GoogleSignIn').default,
  default: () => () => null,
})();

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { control, handleSubmit, errors } = useForm<FormData>();
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

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <IonIcon style={styles.logo} name="scan" size={120} color="white" />
        <Text style={styles.logoText}>Receipts scanner</Text>
      </View>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputSection}>
            <IonIcon
              style={styles.inputIcon}
              name="person-circle"
              size={24}
              color="white"
            />
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
              placeholder="Email"
              accessibilityLabel="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInput.current && passwordInput.current.focus();
              }}
              blurOnSubmit={false}
            />
          </View>
        )}
        name="email"
        defaultValue=""
        rules={{
          required: true,
          validate: (input) => EmailValidator.validate(input),
        }}
      />
      {errors.email && (
        <Text style={styles.validationErrorText}>
          {errors.email.type === 'validate'
            ? 'Invalid email format.'
            : 'This field is required'}
        </Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputSection}>
            <MaterialIcon
              style={styles.inputIcon}
              name="lock"
              size={24}
              color="white"
            />
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
              textContentType="password"
              ref={passwordInput}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(signIn)}
            />
            <Pressable
              style={styles.btnEye}
              onPressIn={() => setShowPass(true)}
              onPressOut={() => setShowPass(false)}>
              {({ pressed }) => (
                <MaterialIcon
                  name="eye"
                  size={24}
                  color={pressed ? 'rgba(255,255,255,0.7)' : 'white'}
                />
              )}
            </Pressable>
          </View>
        )}
        name="password"
        defaultValue=""
        rules={{
          required: true,
          pattern: {
            value: /.{8,}/,
            message: 'Password must be at least 8 characters long',
          },
        }}
      />
      {errors.password && (
        <Text>
          {errors.password.message
            ? errors.password.message
            : 'This field is required'}
        </Text>
      )}
      <Button
        containerStyle={styles.btnSignInContainer}
        onPress={handleSubmit(signIn)}
        loading={signInInProgress}
        disabled={signUpInProgress}
        title={'Sign in'}
      />
      <Button
        containerStyle={styles.btnSignUpContainer}
        onPress={handleSubmit(signUp)}
        title={'Sign up'}
        loading={signUpInProgress}
        disabled={signInInProgress}
      />
      <GoogleSignIn disabled={signInInProgress || signUpInProgress} />
    </ImageBackground>
  );
};

const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    // width: 120,
    // height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 18,
  },
  inputSection: {
    width: WIDTH - 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    marginTop: 10,
    height: 50,
  },
  inputIcon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  btnEye: {
    paddingRight: 20,
    paddingLeft: 8,
  },
  btnSignInContainer: {
    marginTop: 20,
  },
  btnSignUpContainer: {
    marginTop: 10,
  },
  validationErrorText: {
    marginBottom: 5,
  },
});

export default LoginScreen;
