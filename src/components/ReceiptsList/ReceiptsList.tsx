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
import { Input } from 'react-native-elements';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator';
import { FirebaseReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import getAllReceiptsForUser from '../../api/firebase/getAllReceiptsForUser';
import Receipt from './Receipt';
import Icon from '../ThemedIcon/ThemedIonIcon';
import { useNavigation } from '@react-navigation/native';
import NoReceipts from './NoReceipts';
import HeaderIconButton from '../HeaderButton/HeaderIconButton';
import NoFilteredReceipts from './NoFilteredReceipts';
import { LOG } from '../../logger';

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
        <HeaderIconButton icon="search" onPress={handleSearchPress} />
      ),
    });
  }, [handleSearchPress, navigation]);

  if (loadingUser || loadingReceipts) {
    return <ActivityIndicator />;
  }

  if (errorUser) {
    LOG.info(errorUser);
    Alert.alert('Cannot load current user.');
  }

  if (errorReceipts) {
    LOG.info(errorReceipts);
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
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchTerm}
          rightIconContainerStyle={styles.cancelIconContainer}
          rightIcon={
            <Icon
              style={styles.cancelIcon}
              name="close"
              onPress={() => setSearch('')}
            />
          }
        />
      )}
      {searchResults.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={searchResults}
          renderItem={renderItem}
        />
      ) : receipts.length > 0 ? (
        <NoFilteredReceipts />
      ) : (
        <NoReceipts />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    fontSize: 25,
    height: '100%',
    paddingLeft: 15,
    paddingRight: 5,
    textAlignVertical: 'bottom',
  },
  cancelIconContainer: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
});

export default ReceiptsList;
