import { firestoreInstance } from '../../global/firebase';
import firebase from 'firebase';
import { USERS_FIRESTORE } from '../../global/constants';

/**
 * Create a user if they do not exist already
 */
const createUser = (user?: firebase.User) => {
  if (user) {
    const userId = user.uid;
    firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log(`User with uid ${userId} exists.`);
        } else {
          console.log(`Creating User document with uid ${userId}.`);
          firestoreInstance
            .collection(USERS_FIRESTORE)
            .doc(userId)
            .set({
              name: user.displayName,
              email: user.email,
            })
            .then(() => {
              console.log('User added!');
            });
        }
      });
  }
};
export default createUser;
