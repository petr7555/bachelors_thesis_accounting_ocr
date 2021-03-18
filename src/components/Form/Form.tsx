import React, {
  MutableRefObject,
  useCallback,
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
import Icon from 'react-native-vector-icons/Ionicons';
import { getTodaysDateAtNoon } from '../../global/utils';
import { RECEIPTS, USERS } from '../../api/constants';
import updateReceipt from '../../api/udpateReceipt';

// Helper functions
const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Types
type FormScreenRouteProp = RouteProp<HomeStackParamList, 'Form'>;

type ValueType = string | number | Date;

type Field = {
  id: string;
  name: string;
  keyboardType?: KeyboardTypeOptions;
  ref?: MutableRefObject<TextInput | null>;
  render?: (
    onChange: any,
    onBlur: any,
    value: string | number | Date,
  ) => React.ReactElement;
  defaultValue?: ValueType;
};

type Props = {
  route: FormScreenRouteProp;
};

const Form = ({ route }: Props) => {
  const receiptId = route.params?.id;
  const { control, handleSubmit, setValue } = useForm<ReceiptData>();

  const [user] = useAuthState(authInstance);

  const [receiptData] = useDocumentData<FirebaseReceipt>(
    firestoreInstance
      .collection(USERS)
      .doc(user.uid)
      .collection(RECEIPTS)
      .doc(receiptId),
  );

  useEffect(() => {
    if (receiptData) {
      console.log(receiptData, null, 2);
      Object.entries(receiptData).forEach(([key, value]) => {
        if (key === 'transactionDate') {
          // @ts-ignore
          value = value.toDate();
        }
        setValue(key as ReceiptDataMember, value);
      });
    }
  }, [receiptData, setValue]);

  const [show, setShow] = useState(false);

  let flatListRef: FlatList | null;

  const merchantAddressInput = useRef<TextInput>(null);
  const merchantPhoneNumberInput = useRef<TextInput>(null);
  const transactionDateInput = useRef<TextInput>(null);
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

  const onSubmit = useCallback(
    async (data: ReceiptData) => {
      await updateReceipt(user.uid, receiptId, data);
      navigation.navigate('HomeScreen');
    },
    [navigation, receiptId, user.uid],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerText} onPress={handleSubmit(onSubmit)}>
          Save
        </Text>
      ),
    });
  }, [handleSubmit, navigation, onSubmit]);

  const fields: Field[] = [
    {
      name: 'transactionDate',
      ref: transactionDateInput,
      defaultValue: getTodaysDateAtNoon(),
      render: (onChange: any, onBlur: any, value: ValueType) => {
        const date = value instanceof Date ? value : getTodaysDateAtNoon();
        return (
          <>
            <ListItem bottomDivider onPress={() => setShow(true)}>
              <Icon name="calendar" size={20} />
              <ListItem.Content>
                <ListItem.Title>{date.toLocaleDateString()}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShow(false);
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
            label={toSentenceCase(field.name)}
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
    <View style={styles.container}>
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
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'sans-serif-medium',
    color: Colors.primary,
    marginRight: 20,
  },
  input: {
    paddingBottom: 0,
  },
});

export default Form;
