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
  ScrollView,
  StyleSheet,
  useWindowDimensions,
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
import updateReceipt from '../../api/updateReceipt';
import getReceiptForUser from '../../api/getReceiptForUser';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import Icon from '../ThemedIcon/ThemedIonIcon';
import ImageThumbnail from './ImageThumbnail';
import FullWidthImage from './FullWidthImage';
import validateNumber from '../../global/utils/validateNumber';
import getTodaysDateAtNoon from '../../global/utils/getTodaysDateAtNoon';
import toSentenceCase from '../../global/utils/toSentenceCase';
import UniversalModal from '../UniversalModal/UniversalModal';
import { isAndroid, isWindows } from '../../global/utils/platform';
import { useToast } from 'react-native-fast-toast';
import ToastIcon from '../ToastIcon/ToastIcon';

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

type InputType = typeof Input;

type Field = {
  name: FieldName;
  keyboardType?: KeyboardTypeOptions;
  ref?: MutableRefObject<InputType | null>;
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

  const merchantAddressInput = useRef<InputType>(null);
  const merchantPhoneNumberInput = useRef<InputType>(null);
  const transactionDateInput = useRef<InputType>(null);
  const totalInput = useRef<InputType>(null);
  const subtotalInput = useRef<InputType>(null);
  const taxInput = useRef<InputType>(null);
  const tipInput = useRef<InputType>(null);
  const currencyInput = useRef<InputType>(null);

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

  const toast = useToast();
  const showSavedToast = useCallback(() => {
    toast?.show('Receipt has been saved.', {
      type: 'success',
      successIcon: <ToastIcon name="checkmark" />,
    });
  }, [toast]);

  const onSubmit = useCallback(
    async (data: ReceiptData) => {
      await updateReceipt(user.uid, receiptId, data);
      showSavedToast();
      navigation.navigate('HomeScreen');
    },
    [navigation, receiptId, showSavedToast, user.uid],
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
                {(show || isWindows) && (
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
                {isAndroid && (
                  <ListItem.Title>{date.toLocaleDateString()}</ListItem.Title>
                )}
              </ListItem.Content>
            </ListItem>
            {show && isAndroid && (
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
    setPreviewUri(receiptData?.urlOriginal);
    showModal();
  };

  const showProcessed = () => {
    setPreviewUri(receiptData?.urlProcessed);
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

  const { height } = useWindowDimensions();

  const windowsModalContentStyle = StyleSheet.flatten({
    maxHeight: height,
    paddingTop: 70,
    paddingBottom: 55,
    paddingHorizontal: 50,
  });

  return (
    <View style={styles.container}>
      <View style={styles.imagesPreview}>
        <ImageThumbnail
          onPress={showOriginal}
          uri={receiptData?.urlOriginal}
          text="View original"
        />
        <ImageThumbnail
          onPress={showProcessed}
          uri={receiptData?.urlProcessed}
          text="View processed"
        />
      </View>
      <UniversalModal
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <View style={isWindows && windowsModalContentStyle}>
          <Icon
            style={[styles.closeIcon, isWindows && styles.closeIconWindows]}
            name="close-circle"
            onPress={hideModal}
          />
          <ScrollView>
            <FullWidthImage uri={previewUri} />
          </ScrollView>
        </View>
      </UniversalModal>
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
  closeIcon: {
    color: Colors.red,
    fontSize: 50,
    position: 'absolute',
    right: '3%',
    top: '3%',
    zIndex: 1,
  },
  closeIconWindows: {
    paddingHorizontal: 50,
    paddingTop: 70,
  },
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
    borderBottomWidth: 5,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditReceipt;
