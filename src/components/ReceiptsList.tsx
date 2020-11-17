import React from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {ActivityIndicator, View} from 'react-native';
import {useAuthState} from 'react-firebase-hooks/auth';
import LogOutButton from './LogOutButton';
import {Avatar, ListItem} from 'react-native-elements';
import {authInstance, firestore} from '../global/firebase';

type Receipt = DocumentReceipt & {id: string};

type DocumentReceipt = {
  url: string;
  added: FirebaseFirestoreTypes.Timestamp;
};

const ReceiptsList = () => {
  const [user, loadingUser, errorUser] = useAuthState(authInstance);
  // const [
  //   receipts,
  //   loadingReceipts,
  //   errorReceipts,
  // ] = useCollectionData(
  //   firebase
  //     .firestore()
  //     .collection('Users')
  //     .doc(user.uid)
  //     .collection('receipts'),
  //   {idField: 'id'},
  // );

  const receipts = [
    {
      id: 1,
      added: firestore.Timestamp.now(),
      url:
        'https://firebasestorage.googleapis.com/v0/b/bachelorsthesisaccountingocr.appspot.com/o/receipts%2F159a397f-e885-49ef-9df9-a02322c7cc21.jpg?alt=media&token=1df221f8-abc5-46db-9239-f00bfb8208a9',
    },
  ];
  if (loadingUser) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <LogOutButton />
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
