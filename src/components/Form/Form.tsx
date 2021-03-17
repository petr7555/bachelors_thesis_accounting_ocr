import React, { MutableRefObject, useEffect, useRef } from 'react';
import {
  Button,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { RouteProp } from '@react-navigation/native';
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

  const merchantAddressInput = useRef<TextInput>(null);
  const merchantPhoneNumberInput = useRef<TextInput>(null);

  type Field = {
    name: string;
    keyboardType?: KeyboardTypeOptions;
    ref?: MutableRefObject<TextInput | null>;
  };

  const fields: Field[] = [
    {
      name: 'merchantName',
    },
    {
      name: 'merchantAddress',
      ref: merchantAddressInput,
    },
    {
      name: 'merchantPhoneNumber',
      ref: merchantPhoneNumberInput,
      keyboardType: 'phone-pad',
    },
    {
      name: 'transactionDate',
      ref: merchantPhoneNumberInput,
      keyboardType: 'phone-pad',
    },
  ];

  const isLastField = (index: number) => index === fields.length - 1;

  const toSentenceCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <View>
      {fields.map((field, index) => (
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              inputStyle={styles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
              placeholder={toSentenceCase(field.name)}
              accessibilityLabel={toSentenceCase(field.name)}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={isLastField(index) ? 'done' : 'next'}
              autoFocus={index === 0}
              keyboardType={field.keyboardType || 'default'}
              // @ts-ignore
              ref={field.ref}
              blurOnSubmit={false}
              onSubmitEditing={
                isLastField(index)
                  ? handleSubmit(onSubmit)
                  : () => fields[index + 1].ref?.current?.focus()
              }
            />
          )}
          name={field.name}
          defaultValue=""
          key={index}
        />
      ))}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingBottom: 0,
  },
});

export default Form;
