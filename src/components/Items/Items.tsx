import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { Button } from 'react-native-elements';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FirebaseReceipt } from '../ReceiptsList/ReceiptsList';
import getReceiptForUser from '../../api/getReceiptForUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import updateItems from '../../api/updateItems';
import ReceiptItem, { ItemFormData } from './ReceiptItem';

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
    console.log('updating item');
    if (items) {
      const newItems = items.map((item) => {
        return item.id === itemId ? { ...item, ...itemFormData } : item;
      });
      await updateItems(user.uid, receiptId, newItems);
    }
  };

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ReceiptItem item={item} deleteItem={deleteItem} updateItem={updateItem} />
  );

  return (
    <View>
      <FlatList
        data={items}
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
});

export default Items;
