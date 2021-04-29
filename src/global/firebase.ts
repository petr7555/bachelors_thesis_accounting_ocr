import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { ReactNativeFirebase } from '@react-native-firebase/app';
import androidAuth from '@react-native-firebase/auth';
import androidFirestore from '@react-native-firebase/firestore';
import androidStorage from '@react-native-firebase/storage';

import { isAndroid } from './utils/platform';
import { FIREBASE_CREDENTIALS } from './constants';

// 'if' to avoid error 'Firebase App named '[DEFAULT]' already exists'
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CREDENTIALS);
}

const auth = isAndroid ? androidAuth : firebase.auth;
const authInstance = isAndroid ? androidAuth() : firebase.auth();
const firestore = isAndroid ? androidFirestore : firebase.firestore;
const firestoreInstance = isAndroid ? androidFirestore() : firebase.firestore();
const storage = isAndroid ? androidStorage : firebase.storage;
const storageInstance = isAndroid ? androidStorage() : firebase.storage();

if (!isAndroid) {
  // @ts-ignore
  firestoreInstance.settings({ experimentalForceLongPolling: true }); // otherwise fails with 'Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.'
}

export {
  auth,
  authInstance,
  firestore,
  firestoreInstance,
  storage,
  storageInstance,
};

export type FirebaseError =
  | ReactNativeFirebase.NativeFirebaseError
  | firebase.FirebaseError;
