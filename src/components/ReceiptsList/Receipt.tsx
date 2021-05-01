import { Avatar, ListItem, Text } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ConfirmationModal from '../ConfirmDelete/ConfirmationModal';
import React, { useState } from 'react';
import { FirebaseReceipt, HomeScreenNavigationProp } from './ReceiptsList';
import { useNavigation } from '@react-navigation/native';
import deleteReceipt from '../../api/deleteReceipt';
import { StyleSheet } from 'react-native';
import Colors from '../../global/styles/colors';
import { useToast } from 'react-native-fast-toast';
import ToastIcon from '../ToastIcon/ToastIcon';

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
      successIcon: <ToastIcon name="trash" />,
    });
  };

  const removeReceipt = async () => {
    // delete works offline, it does not block, therefore we can await it before showing the toast
    await deleteReceipt(userId, receipt);
    showRemovedToast();
  };

  return (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('EditReceipt', { id: receipt.id })}>
      <Avatar source={{ uri: receipt.urlOriginal }} />
      <ListItem.Content>
        <ListItem.Title>
          <Text>
            {`${
              receipt.merchantName ||
              receipt.merchantAddress ||
              'Unknown merchant'
            } for ${receipt.currency && `${receipt.currency} `}${
              receipt.total
            }.`}
          </Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>{receipt.added.toDate().toDateString()}</Text>
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
});

export default Receipt;
