import React, {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';

type Receipt = DocumentReceipt & {id: string};

type DocumentReceipt = {
  url: string;
  added: FirebaseFirestoreTypes.Timestamp;
};

const ReceiptsList = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [receipts, setReceipts] = useState<Receipt[]>([]); // Initial empty array of users

  useEffect(() => {
    const user = auth().currentUser;
    if (user != null) {
      const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('receipts')
        .onSnapshot((querySnapshot) => {
          const receipts: Receipt[] = [];

          querySnapshot.forEach((documentSnapshot) => {
            receipts.push({
              ...(documentSnapshot.data() as Receipt),
              id: documentSnapshot.id,
            });
          });

          setReceipts(receipts);
          setLoading(false);
        });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
      }}>
      <FlatList
        data={receipts}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{uri: item.url}}
            />
            <Text>Added: {item.added.toDate().toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReceiptsList;
