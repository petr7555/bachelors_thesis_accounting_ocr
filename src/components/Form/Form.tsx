import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  FlatList,
  KeyboardType,
  KeyboardTypeOptions,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { RouteProp, useNavigation } from '@react-navigation/native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../global/styles/colors';

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

  let flatListRef: FlatList | null;

  const merchantAddressInput = useRef<TextInput>(null);
  const merchantPhoneNumberInput = useRef<TextInput>(null);
  const transactionDateInput = useRef<TextInput>(null);
  const transactionTimeInput = useRef<TextInput>(null);
  const totalInput = useRef<TextInput>(null);
  const subtotalInput = useRef<TextInput>(null);
  const taxInput = useRef<TextInput>(null);
  const tipInput = useRef<TextInput>(null);
  const currencyInput = useRef<TextInput>(null);

  type Field = {
    id: number;
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
      keyboardType: 'phone-pad' as KeyboardType,
    },
    {
      name: 'transactionDate',
      ref: transactionDateInput,
    },
    {
      name: 'transactionTime',
      ref: transactionTimeInput,
    },
    {
      name: 'total',
      ref: totalInput,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'subtotal',
      ref: subtotalInput,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'tax',
      ref: taxInput,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'tip',
      ref: tipInput,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'currency',
      ref: currencyInput,
    },
  ].map((field, index) => ({ ...field, id: index }));

  const isLastField = (index: number) => index === fields.length - 1;

  const toSentenceCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const renderField: ListRenderItem<Field> = ({ item: field, index }) => (
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
              : () => {
                  scrollToIndex(index + 1);
                  fields[index + 1].ref?.current?.focus();
                }
          }
        />
      )}
      name={field.name}
      defaultValue=""
      key={index}
    />
  );

  const getItemLayout = (data: any, index: number) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index - 10,
      index,
    };
  };

  const scrollToIndex = (index: number) => {
    flatListRef?.scrollToIndex({ animated: true, index });
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'normal',
            fontFamily: 'sans-serif-medium',
            color: Colors.primary,
            marginRight: 20,
          }}
          onPress={handleSubmit(onSubmit)}>
          Save
        </Text>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={fields}
        renderItem={renderField}
        ref={(ref) => {
          flatListRef = ref;
        }}
        getItemLayout={getItemLayout}
        // prevents keyboard disappearing when it would hide input field
        removeClippedSubviews={false}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const ITEM_HEIGHT = 40 + 16 + 5 + 6;

const styles = StyleSheet.create({
  input: {
    paddingBottom: 0,
  },
});

export default Form;
