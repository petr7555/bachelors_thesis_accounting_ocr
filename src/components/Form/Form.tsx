import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
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
import { Input, ListItem } from 'react-native-elements';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import {
  ReceiptData,
  ReceiptDataMember,
} from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { authInstance, firestoreInstance } from '../../global/firebase';
import { FirebaseReceipt } from '../ReceiptsList/ReceiptsList';
import { useAuthState } from 'react-firebase-hooks/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../global/styles/colors';

// Helper functions
const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Types
type FormScreenRouteProp = RouteProp<HomeStackParamList, 'Form'>;

type ValueType = string | number | Date;
type DateTimePickerMode = 'date' | 'time';

type Field = {
  id: string;
  name: string;
  keyboardType?: KeyboardTypeOptions;
  ref?: MutableRefObject<TextInput | null>;
  render?: (onChange, onBlur, value: ValueType) => React.ReactElement;
  defaultValue?: ValueType;
};

type Props = {
  route: FormScreenRouteProp;
};

const Form = ({ route }: Props) => {
  const id = route.params?.id;
  const { control, handleSubmit, setValue } = useForm<ReceiptData>();
  const onSubmit = (data: ReceiptData) => {
    console.log(data);
  };

  const [user] = useAuthState(authInstance);
  const [receiptData] = useDocumentData<FirebaseReceipt>(
    firestoreInstance
      .collection('Users')
      .doc(user?.uid)
      .collection('receipts')
      .doc(id),
  );
  useEffect(() => {
    if (receiptData) {
      console.log(receiptData, null, 2);
      Object.entries(receiptData).forEach(([key, value]) => {
        if (key === 'transactionDateTime') {
          // @ts-ignore
          value = value.toDate();
        }
        setValue(key as ReceiptDataMember, value);
      });
    }
  }, [receiptData, setValue]);

  // const [mode, setMode] = useState<DateTimePickerMode>('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const ITEM_HEIGHT = 40 + 16 + 5 + 6;
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
  }, [navigation, handleSubmit]);

  // const onDateTimePickerChange = (event, selectedDate, date) => {
  //   console.log('date', date);
  //
  //   if (selectedDate) {
  //     console.log(selectedDate);
  //     // setDate(selectedDate);
  //   }
  //   setShow(false);
  // };
  //
  // const showMode = (currentMode: DateTimePickerMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
  //
  // const showDatePicker = () => {
  //   showMode('date');
  // };
  //
  // const showTimePicker = () => {
  //   showMode('time');
  // };

  const fields: Field[] = [
    {
      name: 'merchantName',
      defaultValue: '',
    },
    {
      name: 'merchantAddress',
      ref: merchantAddressInput,
      defaultValue: '',
    },
    {
      name: 'merchantPhoneNumber',
      ref: merchantPhoneNumberInput,
      defaultValue: '',
      keyboardType: 'phone-pad' as KeyboardType,
    },
    {
      name: 'transactionDateTime',
      ref: transactionDateInput,
      defaultValue: new Date(),
      render: (onChange, onBlur, value: Date) => {
        return (
          <>
            <ListItem bottomDivider onPress={() => setShowDatePicker(true)}>
              <ListItem.Content>
                <ListItem.Title>{value.toDateString()}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {showDatePicker && (
              <DateTimePicker
                value={value}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  console.log(selectedDate);
                  if (selectedDate) {
                    const utc = selectedDate.toUTCString();
                    console.log('utc', utc);
                    const d = selectedDate.getDate();
                    const m = selectedDate.getMonth();
                    const y = selectedDate.getFullYear();
                    const newDate = new Date(`${d}/${m}/${y}`);
                    console.log(newDate);
                    onChange(newDate);
                  }
                }}
              />
            )}
          </>
        );
      },
    },
    {
      name: 'transactionDateTime',
      ref: transactionTimeInput,
      defaultValue: new Date(),
      render: (onChange, onBlur, value: Date) => {
        return (
          <>
            <ListItem bottomDivider onPress={() => setShowTimePicker(true)}>
              <ListItem.Content>
                <ListItem.Title>{value.toTimeString()}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {showTimePicker && (
              <DateTimePicker
                value={value}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(false);
                  console.log(selectedDate);
                  if (selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
          </>
        );
      },
    },
    {
      name: 'total',
      ref: totalInput,
      defaultValue: 0,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'subtotal',
      ref: subtotalInput,
      defaultValue: 0,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'tax',
      ref: taxInput,
      defaultValue: 0,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'tip',
      ref: tipInput,
      defaultValue: 0,
      keyboardType: 'numeric' as KeyboardType,
    },
    {
      name: 'currency',
      defaultValue: '',
      ref: currencyInput,
    },
  ].map((field, index) => ({ ...field, id: index.toString() }));

  const isLastField = (index: number) => index === fields.length - 1;

  const renderField: ListRenderItem<Field> = ({ item: field, index }) => (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => {
        return field.render ? (
          field.render(onChange, onBlur, value)
        ) : (
          <Input
            inputStyle={styles.input}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value.toString()}
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
        );
      }}
      name={field.name}
      defaultValue={field.defaultValue}
      key={index}
    />
  );

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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingBottom: 0,
  },
});

export default Form;
