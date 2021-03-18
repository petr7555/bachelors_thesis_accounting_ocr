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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { FirebaseReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { RECEIPTS, USERS } from '../../api/constants';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

export type FirebaseReceipt = {
  id: string;
  url: string;
  added: FirebaseFirestoreTypes.Timestamp;
} & FirebaseReceiptData;

const ReceiptsList = () => {
  const [user, loadingUser, errorUser] = useAuthState(authInstance);
  const [
    receipts = [],
    loadingReceipts,
    errorReceipts,
  ] = useCollectionData<FirebaseReceipt>(
    firestoreInstance.collection(USERS).doc(user?.uid).collection(RECEIPTS),
    { idField: 'id' },
  );

  const navigation = useNavigation<HomeScreenNavigationProp>();

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
    return (
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('Form', { id: item.id })}>
        <Avatar source={{ uri: item.url }} />
        <ListItem.Content>
          <ListItem.Title>
            {`${
              item.merchantName || item.merchantAddress
            } on ${item.transactionDate.toDate().toDateString()}`}
          </ListItem.Title>
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
