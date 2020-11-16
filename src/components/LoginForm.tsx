import React from 'react';
import {Platform, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth} from '../global/firebase';

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
  const {control, handleSubmit, errors} = useForm<FormData>();

  const signUp = (data: FormData) => {
    auth
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
    auth
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
          <Input
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            placeholder="Email addr"
            keyboardType="email-address"
            textContentType="emailAddress"
            leftIcon={<Icon name="at" size={24} color="black" />}
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
          <Input
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            secureTextEntry={true}
            placeholder="Password"
            textContentType="password"
            leftIcon={<Icon name="key" size={24} color="black" />}
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

      <Button title="Sign in" onPress={handleSubmit(signIn)} />
      <Button title="Sign up" onPress={handleSubmit(signUp)} />
      <GoogleSignIn />
    </View>
  );
};

export default LoginForm;
