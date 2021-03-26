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
  KeyboardTypeOptions,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Input, ListItem, Text } from 'react-native-elements';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import {
  Item,
  ReceiptData,
  ReceiptDataMember,
} from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { authInstance } from '../../global/firebase';
import {
  FirebaseReceipt,
  HomeScreenNavigationProp,
} from '../ReceiptsList/ReceiptsList';
import { useAuthState } from 'react-firebase-hooks/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../global/styles/colors';
import {
  getTodaysDateAtNoon,
  toSentenceCase,
  validateNumber,
} from '../../global/utils';
import updateReceipt from '../../api/updateReceipt';
import getReceiptForUser from '../../api/getReceiptForUser';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import Icon from '../ThemedIcon/ThemedIonIcon';
import ImageThumbnail from './ImageThumbnail';
import Modal from 'react-native-modal';
import FullWidthImage from './FullWidthImage';

// Types
type FormScreenRouteProp = RouteProp<HomeStackParamList, 'EditReceipt'>;

type ValueType = string | number | Date | Item[];

type FieldName =
  | 'transactionDate'
  | 'items'
  | 'merchantName'
  | 'merchantAddress'
  | 'merchantPhoneNumber'
  | 'total'
  | 'subtotal'
  | 'tax'
  | 'tip'
  | 'currency';

type Field = {
  name: FieldName;
  keyboardType?: KeyboardTypeOptions;
  ref?: MutableRefObject<TextInput | null>;
  render?: (
    onChange: any,
    onBlur: any,
    value: string | number | Date,
  ) => React.ReactElement;
  defaultValue?: ValueType;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

type Props = {
  route: FormScreenRouteProp;
};

const EditReceipt = ({ route }: Props) => {
  const receiptId = route.params?.id;
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    trigger,
  } = useForm<ReceiptData>({
    mode: 'all',
  });

  const [user] = useAuthState(authInstance);

  const [receiptData] = useDocumentData<FirebaseReceipt>(
    getReceiptForUser(user.uid, receiptId),
  );

  useEffect(() => {
    if (receiptData) {
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

  const navigation = useNavigation<HomeScreenNavigationProp>();

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
              <Icon style={styles.icon} name="calendar" />
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
      name: 'items',
      defaultValue: [],
      // ref: itemsInput,
      render: () => {
        return (
          <ListItem
            bottomDivider
            onPress={() => {
              navigation.navigate('Items', { id: receiptId });
            }}>
            <Icon style={styles.icon} name="cart" />
            <ListItem.Content>
              <ListItem.Title>
                <Text>Items</Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
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
      keyboardType: 'phone-pad',
    },
    {
      name: 'total',
      ref: totalInput,
      defaultValue: 0,
      keyboardType: 'numeric',
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'subtotal',
      ref: subtotalInput,
      defaultValue: 0,
      keyboardType: 'numeric',
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'tax',
      ref: taxInput,
      defaultValue: 0,
      keyboardType: 'numeric',
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'tip',
      ref: tipInput,
      defaultValue: 0,
      keyboardType: 'numeric',
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'currency',
      defaultValue: '',
      ref: currencyInput,
    },
  ];

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
            onBlur={() => {
              if (value === '') {
                setValue(field.name, field.defaultValue);
                trigger(field.name);
              }
              onBlur();
            }}
            onChangeText={(inputValue) => {
              onChange(inputValue);
            }}
            value={value.toString()}
            placeholder={toSentenceCase(field.name)}
            accessibilityLabel={toSentenceCase(field.name)}
            label={toSentenceCase(field.name)}
            errorMessage={
              errors[field.name] &&
              (errors[field.name]?.message || 'This field is required')
            }
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={isLastField(index) ? 'done' : 'next'}
            autoFocus={index === 0}
            keyboardType={field.keyboardType || 'default'}
            // @ts-ignore
            ref={field.ref}
            blurOnSubmit={false}
            selectTextOnFocus={true}
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
      rules={field.rules}
    />
  );

  const showOriginal = () => {
    setPreviewUri(receiptData?.url);
    showModal();
  };

  const showProcessed = () => {
    setPreviewUri(receiptData?.url);
    showModal();
  };

  const [previewUri, setPreviewUri] = useState<string | undefined>();
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesPreview}>
        <ImageThumbnail
          onPress={showOriginal}
          uri={receiptData?.url}
          text="View original"
        />
        <ImageThumbnail
          onPress={showProcessed}
          uri={receiptData?.url}
          text="View processed"
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <View>
          <ScrollView>
            <Pressable onPress={hideModal}>
              <FullWidthImage uri={previewUri} />
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
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
    color: Colors.primary,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: 'normal',
    marginRight: 20,
  },
  icon: {
    fontSize: 20,
  },
  imagesPreview: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    paddingBottom: 0,
  },
});

export default EditReceipt;