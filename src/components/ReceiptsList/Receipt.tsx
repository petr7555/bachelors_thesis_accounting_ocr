import { Avatar, ListItem } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from '../ConfirmDelete/ConfirmationModal';
import React, { useState } from 'react';
import { FirebaseReceipt, HomeScreenNavigationProp } from './ReceiptsList';
import { useNavigation } from '@react-navigation/native';
import deleteReceipt from '../../api/deleteReceipt';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../global/styles/colors';
import Icon from '../ThemedIcon/ThemedIonIcon';
import { useToast } from 'react-native-fast-toast';

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

  const toast = useToast();

  const showRemovedToast = () => {
    toast?.show('Receipt has been removed.', {
      type: 'success',
      successIcon: <Icon style={styles.toastIcon} name="trash" />,
    });
  };

  const removeReceipt = async () => {
    await deleteReceipt(userId, receipt.id);
    showRemovedToast();
  };

  return (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('EditReceipt', { id: receipt.id })}>
      <Avatar source={{ uri: receipt.urlProcessed }} />
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
        onConfirm={removeReceipt}
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
  toastIcon: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default Receipt;
