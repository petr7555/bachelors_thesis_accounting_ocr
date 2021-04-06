import { RouteProp, useNavigation, useTheme } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
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
import { MixedTheme } from '../../../App';
import Toast from 'react-native-fast-toast';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const showToast = () => {
    toast.current?.show('Item has been added.', {
      type: 'success',
      successColor: Colors.primary,
      successIcon: <Icon style={styles.checkmarkIcon} name="checkmark" />,
    });
  };

  const addItem = useCallback(async () => {
    showToast();

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

  const { colors } = useTheme() as MixedTheme;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={[styles.headerText, { color: colors.secondary }]}
          onPress={addItem}>
          Add
        </Text>
      ),
    });
  }, [addItem, colors.secondary, navigation]);

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ReceiptItem item={item} deleteItem={deleteItem} updateItem={updateItem} />
  );

  const toast = useRef<Toast>(null);

  return (
    <>
      <FlatList
        data={items}
        renderItem={renderItem}
        // prevents keyboard disappearing when it would hide input field
        removeClippedSubviews={false}
      />
      <Toast ref={toast} />
    </>
  );
};

const styles = StyleSheet.create({
  checkmarkIcon: {
    color: Colors.white,
    fontSize: 20,
  },
  headerText: {
    color: Colors.secondary,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: 'normal',
    marginRight: 20,
  },
});

export default Items;
