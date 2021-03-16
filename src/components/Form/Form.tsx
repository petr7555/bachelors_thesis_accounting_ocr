import React, { useEffect, useRef } from 'react';
import { Button, Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
import EmailValidator from 'email-validator';
import { Input } from 'react-native-elements';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import {
  ReceiptData,
  ReceiptDataMember,
} from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { authInstance, firestoreInstance } from '../../global/firebase';
import { Receipt } from '../ReceiptsList/ReceiptsList';
import { useAuthState } from 'react-firebase-hooks/auth';

type FormScreenRouteProp = RouteProp<HomeStackParamList, 'Form'>;

type Props = {
  route: FormScreenRouteProp;
};

const Form = ({ route }: Props) => {
  const id = route.params?.id;
  console.log('Route data:', id);

  const { control, handleSubmit, errors, setValue } = useForm<ReceiptData>();

  const [user, loadingUser, errorUser] = useAuthState(authInstance);

  const [receiptData, loadingReceipt, errorReceipt] = useDocumentData<Receipt>(
    firestoreInstance
      .collection('Users')
      .doc(user?.uid)
      .collection('receipts')
      .doc(id),
  );

  useEffect(() => {
    if (receiptData) {
      console.log(receiptData, null, 2);
      Object.entries(receiptData).forEach(([key, value]) =>
        setValue(key as ReceiptDataMember, value),
      );
    }
  }, [receiptData, setValue]);

  const onSubmit = (data: ReceiptData) => {
    console.log(data);
  };

  const passwordInput = useRef<TextInput>(null);
  console.log(errors.merchantName);
  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            inputStyle={styles.input}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            placeholder="Merchant Name"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="organizationName"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInput.current && passwordInput.current.focus();
            }}
            blurOnSubmit={false}
            errorMessage={errors.merchantName && 'This field is required'}
          />
        )}
        name="merchantName"
        defaultValue=""
        rules={{
          required: true,
          validate: (input) => EmailValidator.validate(input),
        }}
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Merchant Address"
            textContentType="addressCityAndState"
            // @ts-ignore
            ref={passwordInput}
            returnKeyType="done"
            errorMessage={errors.merchantAddress && 'This field is required'}
          />
        )}
        name="merchantAddress"
        defaultValue=""
        rules={{
          required: true,
          pattern: {
            value: /.{8,}/,
            message: 'Password must be at least 8 characters long',
          },
        }}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
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
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 40,
  },
  input: {
    paddingBottom: 0,
  },
  inputContainer: {},
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

export default Form;
