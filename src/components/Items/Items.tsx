import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { Button, ListItem } from 'react-native-elements';
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

  const [modalVisible, setModalVisible] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');

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

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        console.log('edit');
      }}>
      <ListItem.Content>
        <ListItem.Title>🍉 {item.name}</ListItem.Title>
      </ListItem.Content>
      <IonIcon
        name="remove-circle"
        color="#e00000"
        size={20}
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
});

export default Items;
