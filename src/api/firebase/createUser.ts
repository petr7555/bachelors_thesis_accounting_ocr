import { firestoreInstance } from '../../global/firebase';
import firebase from 'firebase';
import { USERS_FIRESTORE } from '../../global/constants';
import { LOG } from '../../logger';

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
      // @ts-ignore
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          LOG.info(`User with uid ${userId} exists.`);
        } else {
          LOG.info(`Creating User document with uid ${userId}.`);
          firestoreInstance
            .collection(USERS_FIRESTORE)
            .doc(userId)
            .set({
              name: user.displayName,
              email: user.email,
            })
            .then(() => {
              LOG.info('User added!');
            });
        }
      });
  }
};
export default createUser;
