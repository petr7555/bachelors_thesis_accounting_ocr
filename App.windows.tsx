import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import ReceiptsList from './src/components/ReceiptsList';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import LoginForm from './src/components/LoginForm';

firebase.initializeApp({
  apiKey: 'AIzaSyD74G5PwH1Tp78gKxMeSglmdEAnHjCVtN4',
  authDomain: 'bachelorsthesisaccountingocr.firebaseapp.com',
  databaseURL: 'https://bachelorsthesisaccountingocr.firebaseio.com',
  projectId: 'bachelorsthesisaccountingocr',
  storageBucket: 'bachelorsthesisaccountingocr.appspot.com',
  messagingSenderId: '729638290812',
  appId: '1:729638290812:web:8852ff14d3418065f810f9',
  measurementId: 'G-96W0V52W5E',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
firestore.settings({experimentalForceLongPolling: true}); // otherwise fails with 'Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.'

export const AuthContext = React.createContext(auth);
export const FirestoreContext = React.createContext(firestore);

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={auth}>
      <FirestoreContext.Provider value={firestore}>
        <View>
          <Text style={{color: 'black', fontSize: 50}}>Hello windows!</Text>
          {user ? <ReceiptsList /> : <LoginForm />}
        </View>
      </FirestoreContext.Provider>
    </AuthContext.Provider>
  );
};
export default App;
