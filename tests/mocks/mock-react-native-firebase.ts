jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: () => {},
  });
});

class FirestoreMock {}

const mockFirestore = new FirestoreMock();

jest.mock('@react-native-firebase/firestore', () => {
  const module = () => mockFirestore;

  module.Timestamp = {
    now: () => ({
      toDate: () => new Date(2021, 4, 1, 8, 30, 15),
    }),
  };

  return module;
});
