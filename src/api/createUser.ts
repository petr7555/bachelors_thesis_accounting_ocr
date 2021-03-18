import { firestoreInstance } from '../global/firebase';
import { USERS } from './constants';
import firebase from 'firebase';

const createUser = (user?: firebase.User) => {
  if (user) {
    const userId = user.uid;
    firestoreInstance
      .collection(USERS)
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User with uid', userId, 'exists');
        } else {
          console.log('Creating User document with uid', userId);
          firestoreInstance
            .collection(USERS)
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
