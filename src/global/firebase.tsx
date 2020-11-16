import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {Platform} from 'react-native';
import androidAuth from '@react-native-firebase/auth';
import androidFirestore from '@react-native-firebase/firestore';

// to avoid error 'Firebase App named '[DEFAULT]' already exists'
if (!firebase.apps.length) {
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
}

const auth = Platform.OS === 'android' ? androidAuth() : firebase.auth();
const firestore =
  Platform.OS === 'android' ? androidFirestore() : firebase.firestore();
if (Platform.OS !== 'android') {
  firestore.settings({experimentalForceLongPolling: true});
} // otherwise fails with 'Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.'

export {auth, firestore};
