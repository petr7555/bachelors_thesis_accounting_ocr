import {useTheme} from '@react-navigation/native';
import {Text, View} from 'react-native';
import * as React from 'react';

const CameraScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Camera!</Text>
    </View>
  );
};

export default CameraScreen;
