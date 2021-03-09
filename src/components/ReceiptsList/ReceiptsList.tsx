import React from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, ListItem } from 'react-native-elements';
import { authInstance, firestoreInstance } from '../../global/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

type Receipt = {
  id: string;
  url: string;
  added: FirebaseFirestoreTypes.Timestamp;
};

const ReceiptsList = () => {
  const [user, loadingUser, errorUser] = useAuthState(authInstance);
  const [
    receipts = [],
    loadingReceipts,
    errorReceipts,
  ] = useCollectionData<Receipt>(
    firestoreInstance.collection('Users').doc(user?.uid).collection('receipts'),
    { idField: 'id' },
  );

  if (loadingUser || loadingReceipts) {
    return <ActivityIndicator />;
  }

  if (errorUser) {
    console.log(errorUser);
    Alert.alert('Cannot load current user.');
  }

  if (errorReceipts) {
    console.log(errorReceipts);
    Alert.alert('Cannot load receipts.');
  }

  const renderItem: ListRenderItem<Receipt> = ({ item }) => {
    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.url }} />
        <ListItem.Content>
          <ListItem.Title>{item.url}</ListItem.Title>
          <ListItem.Subtitle>
            {item.added.toDate().toDateString()}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={receipts}
      renderItem={renderItem}
    />
  );
};
export default ReceiptsList;
