import { Avatar, ListItem } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from '../ConfirmDelete/ConfirmationModal';
import React, { useState } from 'react';
import { FirebaseReceipt, HomeScreenNavigationProp } from './ReceiptsList';
import { useNavigation } from '@react-navigation/native';
import deleteReceipt from '../../api/deleteReceipt';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../global/styles/colors';

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
          <Text>
            {`${
              receipt.merchantName || receipt.merchantAddress
            } on ${receipt.transactionDate.toDate().toDateString()}`}
          </Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          {receipt.added.toDate().toDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <IonIcon
        style={styles.icon}
        name="remove-circle"
        onPress={() => {
          showModal();
        }}
      />
      <ConfirmationModal
        isVisible={isModalVisible}
        id={receipt.id}
        text="Remove this receipt?"
        onConfirm={() => deleteReceipt(userId, receipt.id)}
        onCancel={hideModal}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.red,
    fontSize: 25,
  },
});

export default Receipt;
