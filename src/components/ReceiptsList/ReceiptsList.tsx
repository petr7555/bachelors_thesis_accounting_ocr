import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { FirebaseReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import getAllReceiptsForUser from '../../api/getAllReceiptsForUser';
import Receipt from './Receipt';
import { Input } from 'react-native-elements';
import Icon from '../ThemedIcon/ThemedIonIcon';
import { useNavigation } from '@react-navigation/native';

export const filterReceipts = (
  receipts: FirebaseReceipt[],
  searchTerm: string,
): FirebaseReceipt[] => {
  const st = searchTerm.toLowerCase();
  return receipts.filter((receipt) => {
    return (
      receipt.merchantName.toLowerCase().includes(st) ||
      receipt.merchantAddress.toLowerCase().includes(st) ||
      receipt.items.some((item) => item.name.toLowerCase().includes(st))
    );
  });
};

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

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<FirebaseReceipt[]>([]);

  useEffect(() => {
    if (!loadingReceipts) {
      const results = filterReceipts(receipts, searchTerm);
      setSearchResults(results);
    }
  }, [loadingReceipts, receipts, searchTerm]);

  const handleChangeText = (text: string) => setSearch(text);
  const handleSearchPress = useCallback(() => {
    setSearchVisible((visible) => !visible);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          style={styles.searchIcon}
          name="search"
          onPress={handleSearchPress}
        />
      ),
    });
  }, [handleSearchPress, navigation]);

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
    <View style={styles.container}>
      {searchVisible && (
        <Input
          autoFocus={true}
          style={styles.input}
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchTerm}
          rightIconContainerStyle={styles.cancelIconContainer}
          rightIcon={
            // TODO convenient to click on mobile? ...add padding
            <Icon
              style={styles.cancelIcon}
              name="close"
              onPress={() => setSearch('')}
            />
          }
        />
      )}
      <FlatList
        keyExtractor={(item) => item.id}
        data={searchResults}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    fontSize: 25,
  },
  cancelIconContainer: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  input: {
    paddingBottom: 0,
  },
  searchIcon: {
    fontSize: 25,
    paddingHorizontal: 15,
  },
});

export default ReceiptsList;
