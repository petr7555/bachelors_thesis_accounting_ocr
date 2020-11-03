import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';
import * as React from 'react';
import Form from './Form';

const NewReceiptScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>New receipt!</Text>
      <Form />
    </View>
  );
};

export default NewReceiptScreen;
