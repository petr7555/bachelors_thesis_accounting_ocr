import React from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {ActivityIndicator, View} from 'react-native';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Avatar, ListItem} from 'react-native-elements';
import {authInstance, firestoreInstance} from '../global/firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';

type Receipt = DocumentReceipt & {id: string};

type DocumentReceipt = {
  url: string;
  added: FirebaseFirestoreTypes.Timestamp;
};

const ReceiptsList = () => {
  const [user, loadingUser, errorUser] = useAuthState(authInstance);
  const [
    receipts = [],
    loadingReceipts,
    errorReceipts,
  ] = useCollectionData(
    firestoreInstance.collection('Users').doc(user?.uid).collection('receipts'),
    {idField: 'id'},
  );

  if (loadingUser || loadingReceipts) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {receipts.map((receipt) => (
        <ListItem key={receipt.id} bottomDivider>
          <Avatar source={{uri: receipt.url}} />
          <ListItem.Content>
            <ListItem.Title>{receipt.url}</ListItem.Title>
            <ListItem.Subtitle>
              {receipt.added.toDate().toDateString()}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default ReceiptsList;
