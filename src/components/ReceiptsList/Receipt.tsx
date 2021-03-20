import { Avatar, ListItem } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from '../ConfirmDelete/ConfirmationModal';
import React, { useState } from 'react';
import { FirebaseReceipt, HomeScreenNavigationProp } from './ReceiptsList';
import { useNavigation } from '@react-navigation/native';
import deleteReceipt from '../../api/deleteReceipt';

type Props = {
  userId: string;
  receipt: FirebaseReceipt;
};

const Receipt = ({ userId, receipt }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('Form', { id: receipt.id })}>
      <Avatar source={{ uri: receipt.url }} />
      <ListItem.Content>
        <ListItem.Title>
          {`${
            receipt.merchantName || receipt.merchantAddress
          } on ${receipt.transactionDate.toDate().toDateString()}`}
        </ListItem.Title>
        <ListItem.Subtitle>
          {receipt.added.toDate().toDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <IonIcon
        name="remove-circle"
        color="#e00000"
        size={25}
        onPress={() => {
          showModal();
        }}
      />
      <ConfirmationModal
        isVisible={isModalVisible}
        id={receipt.id}
        onConfirm={() => deleteReceipt(userId, receipt.id)}
        onCancel={hideModal}
      />
    </ListItem>
  );
};

export default Receipt;
