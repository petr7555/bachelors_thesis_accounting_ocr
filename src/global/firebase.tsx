import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { ReactNativeFirebase } from '@react-native-firebase/app';
import androidAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import androidFirestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import androidStorage, {
  FirebaseStorageTypes,
} from '@react-native-firebase/storage';

import { isAndroid } from './utils/platform';

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

let auth:
  | ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
      FirebaseAuthTypes.Module,
      FirebaseAuthTypes.Statics
    >
  | ((app?: firebase.app.App) => firebase.auth.Auth);
let authInstance: FirebaseAuthTypes.Module | firebase.auth.Auth;

let firestore:
  | ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
      FirebaseFirestoreTypes.Module,
      FirebaseFirestoreTypes.Statics
    >
  | ((app?: firebase.app.App) => firebase.firestore.Firestore);
let firestoreInstance:
  | FirebaseFirestoreTypes.Module
  | firebase.firestore.Firestore;

let storage:
  | ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
      FirebaseStorageTypes.Module,
      FirebaseStorageTypes.Statics
    >
  | ((app?: firebase.app.App) => firebase.storage.Storage);
let storageInstance: FirebaseStorageTypes.Module | firebase.storage.Storage;

if (isAndroid) {
  auth = androidAuth;
  authInstance = androidAuth();

  firestore = androidFirestore;
  firestoreInstance = androidFirestore();

  storage = androidStorage;
  storageInstance = androidStorage();
} else {
  auth = firebase.auth;
  authInstance = firebase.auth();

  firestore = firebase.firestore;
  firestoreInstance = firebase.firestore();
  firestoreInstance.settings({ experimentalForceLongPolling: true }); // otherwise fails with 'Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.'

  storage = firebase.storage;
  storageInstance = firebase.storage();
}

export {
  auth,
  firestore,
  authInstance,
  firestoreInstance,
  storage,
  storageInstance,
};

export type FirebaseError =
  | ReactNativeFirebase.NativeFirebaseError
  | firebase.FirebaseError;
