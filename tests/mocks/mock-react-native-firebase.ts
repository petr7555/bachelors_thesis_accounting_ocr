jest.mock('@react-native-firebase/auth', () => {
  return () => ({});
});

jest.mock('@react-native-firebase/firestore', () => {
  const module = () => {
    return {
      collection: jest.fn(() => {}),
    };
  };

  module.Timestamp = {
    now: () => ({
      toDate: () => new Date(),
    }),
  };

  return module;
});
