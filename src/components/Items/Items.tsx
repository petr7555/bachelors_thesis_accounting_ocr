import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import {
  Item,
  ReceiptData,
} from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { Button, Input, ListItem } from 'react-native-elements';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FirebaseReceipt } from '../ReceiptsList/ReceiptsList';
import getReceiptForUser from '../../api/getReceiptForUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import updateItems from '../../api/updateItems';
import { Controller, useForm } from 'react-hook-form';
import { toSentenceCase } from '../../global/utils';
import updateReceipt from '../../api/updateReceipt';

type ItemsScreenRouteProp = RouteProp<HomeStackParamList, 'Items'>;

type ItemFormData = {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

type Props = {
  route: ItemsScreenRouteProp;
};

const Items = ({ route }: Props) => {
  const receiptId = route.params?.id;

  const [user] = useAuthState(authInstance);
  const [receiptData] = useDocumentData<FirebaseReceipt>(
    getReceiptForUser(user.uid, receiptId),
  );

  const {
    control,
    handleSubmit,
    setValue,
    errors,
    trigger,
  } = useForm<ItemFormData>({
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: ReceiptData) => {
      await updateReceipt(user.uid, receiptId, data);
    },
    [receiptId, user.uid],
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');
  const [itemsBeingEdited, setItemsBeingEdited] = useState<string[]>([]);

  const quantityInput = useRef<TextInput>(null);
  const priceInput = useRef<TextInput>(null);
  const totalPriceInput = useRef<TextInput>(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const deleteItem = async (itemId: string) => {
    if (receiptData) {
      const newItems = receiptData.items.filter(({ id }) => id !== itemId);
      await updateItems(user.uid, receiptId, newItems);
    }
  };

  const editingItem = (item: Item) => itemsBeingEdited.includes(item.id);

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
    },
    {
      name: 'price',
      ref: priceInput,
      defaultValue: 0,
      width: '30%',
    },
    {
      name: 'totalPrice',
      ref: totalPriceInput,
      defaultValue: 0,
      width: '40%',
    },
  ];

  const isLastField = (index: number) => index === fields.length - 1;

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem bottomDivider containerStyle={{ height: 200, paddingLeft: 5 }}>
      <ListItem.Content>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {fields.map((field, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: field.width,
                }}>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      containerStyle={{
                        flex: field.flex,
                      }}
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
                      disabled={!editingItem(item)}
                      value={value.toString()}
                      placeholder={toSentenceCase(field.name)}
                      accessibilityLabel={toSentenceCase(field.name)}
                      label={toSentenceCase(field.name)}
                      errorMessage={
                        errors[field.name] &&
                        (errors[field.name]?.message ||
                          'This field is required')
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
      {editingItem(item) ? (
        <IonIcon
          name="checkmark-circle-outline"
          color="green"
          size={25}
          onPress={() => {
            setItemsBeingEdited(
              itemsBeingEdited.filter((id) => id !== item.id),
            );
          }}
        />
      ) : (
        <MaterialIcon
          name="square-edit-outline"
          color="green"
          size={25}
          onPress={() => {
            setItemsBeingEdited([...itemsBeingEdited, item.id]);
          }}
        />
      )}
      <IonIcon
        name="remove-circle"
        color="#e00000"
        size={25}
        onPress={() => {
          showModal();
          setItemToBeDeleted(item.id);
        }}
      />
    </ListItem>
  );

  return (
    <View>
      <FlatList
        data={receiptData?.items}
        renderItem={renderItem}
        // prevents keyboard disappearing when it would hide input field
        removeClippedSubviews={false}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add item"
          icon={
            <MaterialIcon
              name="cart-plus"
              color="white"
              size={20}
              style={styles.icon}
            />
          }
          onPress={() => {
            console.log('add');
          }}
        />
      </View>
      <Modal
        // style={styles.modalView}
        isVisible={modalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <ConfirmDelete
          onDelete={() => {
            hideModal();
            deleteItem(itemToBeDeleted);
          }}
          onCancel={hideModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  icon: {
    paddingRight: 8,
  },
  input: {
    paddingBottom: 0,
  },
});

export default Items;
