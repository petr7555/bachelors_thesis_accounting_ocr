import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import firebase from 'firebase/app';

const GoogleSignIn = Platform.select({
  android: () => require('./GoogleSignIn'),
  default: () => () => null,
})();

console.log(GoogleSignIn);

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const theme = useTheme();
  const {control, handleSubmit, errors, reset} = useForm<FormData>();

  const signUp = (data: FormData) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const signIn = (data: FormData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={{...styles.input, color: theme.colors.text}}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        )}
        name="email"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={{...styles.input, color: theme.colors.text}}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            secureTextEntry={true}
            placeholder="Password"
            textContentType="password"
          />
        )}
        name="password"
        rules={{
          required: true,
          pattern: {
            value: /.{8,}/,
            message: 'Password must be at least 8 characters long',
          },
        }}
        defaultValue=""
      />
      {errors.password && (
        <Text>
          {errors.password.message
            ? errors.password.message
            : 'This field is required'}
        </Text>
      )}

      <Button
        color={theme.colors.primary}
        title="Sign in"
        onPress={handleSubmit(signIn)}
      />
      <Button
        color={theme.colors.primary}
        title="Sign up"
        onPress={handleSubmit(signUp)}
      />
      <GoogleSignIn />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default LoginForm;
