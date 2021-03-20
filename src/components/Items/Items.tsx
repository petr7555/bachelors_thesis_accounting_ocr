import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text } from 'react-native';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {
  FirebaseReceipt,
  HomeScreenNavigationProp,
} from '../ReceiptsList/ReceiptsList';
import getReceiptForUser from '../../api/getReceiptForUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import updateItems from '../../api/updateItems';
import ReceiptItem, { ItemFormData } from './ReceiptItem';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../../global/styles/colors';

type ItemsScreenRouteProp = RouteProp<HomeStackParamList, 'Items'>;

type Props = {
  route: ItemsScreenRouteProp;
};

const Items = ({ route }: Props) => {
  const receiptId = route.params?.id;

  const [user] = useAuthState(authInstance);
  const [receiptData] = useDocumentData<FirebaseReceipt>(
    getReceiptForUser(user.uid, receiptId),
  );

  const items = receiptData?.items;

  const deleteItem = async (itemId: string) => {
    if (items) {
      const newItems = items.filter(({ id }) => id !== itemId);
      await updateItems(user.uid, receiptId, newItems);
    }
  };

  const updateItem = async (itemId: string, itemFormData: ItemFormData) => {
    if (items) {
      const newItems = items.map((item) => {
        return item.id === itemId ? { ...item, ...itemFormData } : item;
      });
      await updateItems(user.uid, receiptId, newItems);
    }
  };

  const addItem = useCallback(async () => {
    const newItem = {
      id: uuidv4(),
      name: 'New item',
      quantity: 1,
      price: 0,
      totalPrice: 0,
    };
    await updateItems(user.uid, receiptId, [...(items || []), newItem]);
  }, [items, receiptId, user.uid]);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerText} onPress={addItem}>
          Add
        </Text>
      ),
    });
  }, [addItem, navigation]);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ReceiptItem item={item} deleteItem={deleteItem} updateItem={updateItem} />
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      // prevents keyboard disappearing when it would hide input field
      removeClippedSubviews={false}
    />
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: Colors.secondary,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: 'normal',
    marginRight: 20,
  },
});

export default Items;
