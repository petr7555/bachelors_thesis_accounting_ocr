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

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

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

  const renderItem: ListRenderItem<Receipt> = ({ item }) => {
    return (
      //TODO pass receipt data
      <ListItem bottomDivider onPress={() => navigation.navigate('Form')}>
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
