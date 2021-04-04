import { Controller, useForm } from 'react-hook-form';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Input, ListItem } from 'react-native-elements';
import {
  KeyboardType,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import ConfirmationModal from '../ConfirmDelete/ConfirmationModal';
import Colors from '../../global/styles/colors';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import validateNumber from '../../global/utils/validateNumber';
import toSentenceCase from '../../global/utils/toSentenceCase';

export type ItemFormData = {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

type ValueType = string | number | Date | Item[];

type FieldName = 'name' | 'quantity' | 'price' | 'totalPrice';

type Field = {
  name: FieldName;
  keyboardType?: KeyboardTypeOptions;
  ref?: MutableRefObject<TextInput | null>;
  defaultValue?: ValueType;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  width: string;
};

type ItemFormDataMember = keyof ItemFormData;

type Props = {
  item: Item;
  deleteItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, itemFormData: ItemFormData) => Promise<void>;
};

const ReceiptItem = ({ item, deleteItem, updateItem }: Props) => {
  const quantityInput = useRef<TextInput>(null);
  const priceInput = useRef<TextInput>(null);
  const totalPriceInput = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    setValue,
    errors,
    trigger,
  } = useForm<ItemFormData>({
    mode: 'all',
  });

  const onSubmit = (data: ItemFormData) => updateItem(item.id, data);

  useEffect(() => {
    Object.entries(item).forEach(([key, value]) => {
      setValue(key as ItemFormDataMember, value);
    });
  }, [item, setValue]);

  const [editing, setEditing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  const isLastField = (index: number) => index === fields.length - 1;

  const fields: Field[] = [
    {
      name: 'name',
      defaultValue: '',
      width: '100%',
    },
    {
      name: 'quantity',
      ref: quantityInput,
      defaultValue: 1,
      width: '30%',
      keyboardType: 'numeric' as KeyboardType,
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'price',
      ref: priceInput,
      defaultValue: 0,
      width: '30%',
      keyboardType: 'numeric' as KeyboardType,
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
    {
      name: 'totalPrice',
      ref: totalPriceInput,
      defaultValue: 0,
      width: '40%',
      keyboardType: 'numeric' as KeyboardType,
      rules: {
        required: true,
        validate: validateNumber,
      },
    },
  ];

  return (
    <ListItem bottomDivider containerStyle={styles.item}>
      <ListItem.Content>
        <View style={styles.inputFields}>
          {fields.map((field, index) => {
            return (
              <View
                key={index}
                style={[styles.inputFieldContainer, { width: field.width }]}>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
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
                      disabled={!editing}
                      value={value.toString()}
                      accessibilityLabel={toSentenceCase(field.name)}
                      label={toSentenceCase(field.name)}
                      errorMessage={
                        errors[field.name] &&
                        (errors[field.name]?.message || 'Required')
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
                              fields[index + 1].ref?.current?.focus();
                            }
                      }
                    />
                  )}
                  name={field.name}
                  defaultValue={field.defaultValue}
                  rules={field.rules}
                />
              </View>
            );
          })}
        </View>
      </ListItem.Content>
      {editing ? (
        <IonIcon
          style={styles.icon}
          name="checkmark-circle-outline"
          color={Colors.green}
          onPress={() => {
            setEditing(false);
            handleSubmit(onSubmit)();
          }}
        />
      ) : (
        <MaterialIcon
          style={styles.icon}
          name="square-edit-outline"
          color={Colors.green}
          onPress={() => {
            setEditing(true);
          }}
        />
      )}
      <IonIcon
        style={styles.icon}
        name="remove-circle"
        color={Colors.red}
        onPress={() => {
          showModal();
        }}
      />
      <ConfirmationModal
        isVisible={isModalVisible}
        id={item.id}
        onConfirm={deleteItem}
        onCancel={hideModal}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 25,
  },
  input: {
    paddingBottom: 0,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: 200,
    paddingLeft: 5,
  },
});

export default ReceiptItem;
