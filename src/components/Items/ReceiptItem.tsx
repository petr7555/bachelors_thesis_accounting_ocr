import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { Input, ListItem } from 'react-native-elements';
import { KeyboardType, StyleSheet, TextInput, View } from 'react-native';
import { toSentenceCase, validateNumber } from '../../global/utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import Modal from 'react-native-modal';

export type ItemFormData = {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

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
      setValue(key, value);
    });
  }, [item, setValue]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const isLastField = (index: number) => index === fields.length - 1;

  const fields = [
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
          name="checkmark-circle-outline"
          color="green"
          size={25}
          onPress={() => {
            setEditing(false);
            handleSubmit(onSubmit)();
          }}
        />
      ) : (
        <MaterialIcon
          name="square-edit-outline"
          color="green"
          size={25}
          onPress={() => {
            setEditing(true);
          }}
        />
      )}
      <IonIcon
        name="remove-circle"
        color="#e00000"
        size={25}
        onPress={() => {
          showModal();
        }}
      />
      <Modal
        // style={styles.modalView}
        isVisible={modalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <ConfirmDelete
          onDelete={() => {
            hideModal();
            deleteItem(item.id);
          }}
          onCancel={hideModal}
        />
      </Modal>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  inputFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: 200,
    paddingLeft: 5,
  },
  input: {
    paddingBottom: 0,
  },
});

export default ReceiptItem;
