import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {authInstance} from '../global/firebase';
import Colors from '../global/styles/colors';
import bgImage from '../../images/background.jpg';

const GoogleSignIn = Platform.select({
  android: () => require('./GoogleSignIn').default,
  default: () => () => null,
})();

type FormData = {
  email: string;
  password: string;
};

const {width: WIDTH} = Dimensions.get('window');

const LoginForm = () => {
  const {control, handleSubmit, errors} = useForm<FormData>();
  const [showPass, setShowPass] = useState(false);

  const signUp = (data: FormData) => {
    authInstance
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

  const login = (data: FormData) => {
    authInstance
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
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <IonIcon style={styles.logo} name="scan" size={120} color="white" />
        <Text style={styles.logoText}>Receipts scanner</Text>
      </View>

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
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
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />
          </View>
        )}
        name="email"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.email && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
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
              placeholderTextColor="rgba(255,255,255,0.7)"
              textContentType="password"
            />
            <Pressable
              style={styles.btnEye}
              onPressIn={() => setShowPass(true)}
              onPressOut={() => setShowPass(false)}>
              {({pressed}) => (
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

      <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(login)}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSignUp} onPress={handleSubmit(signUp)}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      <GoogleSignIn />
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
    marginBottom: 50,
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
    marginVertical: 5,
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
  btnLogin: {
    width: WIDTH - 60,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    marginTop: 20,
  },
  btnSignUp: {
    width: WIDTH - 60,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default LoginForm;
