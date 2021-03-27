import React from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { FirebaseReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import getAllReceiptsForUser from '../../api/getAllReceiptsForUser';
import Receipt from './Receipt';

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

export type FirebaseReceipt = {
  id: string;
  urlOriginal: string;
  urlProcessed: string;
  added: FirebaseFirestoreTypes.Timestamp;
} & FirebaseReceiptData;

const ReceiptsList = () => {
  const [user, loadingUser, errorUser] = useAuthState(authInstance);
  const [
    receipts = [],
    loadingReceipts,
    errorReceipts,
  ] = useCollectionData<FirebaseReceipt>(getAllReceiptsForUser(user?.uid), {
    idField: 'id',
  });

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

  const renderItem: ListRenderItem<FirebaseReceipt> = ({ item }) => {
    return <Receipt userId={user.uid} receipt={item} />;
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
