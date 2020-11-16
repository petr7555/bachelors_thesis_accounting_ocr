import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';
import * as React from 'react';
import LogOutButton from './LogOutButton';

const SettingsScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Settings!</Text>
      <LogOutButton />
    </View>
  );
};

export default SettingsScreen;
