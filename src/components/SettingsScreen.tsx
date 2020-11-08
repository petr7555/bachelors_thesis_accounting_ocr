import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Button, Text, View} from 'react-native';
import * as React from 'react';

const SettingsScreen = () => {
  const {colors} = useTheme();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Settings!</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  );
};

export default SettingsScreen;
