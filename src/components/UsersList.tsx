import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native';

type User = {
  name: string;
  id: string;
};

type DocumentUser = {
  name: string;
};

const UsersList = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState<User[]>([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot((querySnapshot) => {
        const users: User[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...(documentSnapshot.data() as DocumentUser),
            id: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <View
          style={{
            height: 50,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>User ID: {item.id}</Text>
          <Text>User Name: {item.name}</Text>
        </View>
      )}
    />
  );
};

export default UsersList;
