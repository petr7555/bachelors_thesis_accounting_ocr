import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import ReceiptsList from './src/components/ReceiptsList';

const App = () => {
  return (
    <View>
      <Text style={{color: 'black', fontSize: 50}}>Hello windows!</Text>
      <Button title="Solid Button" />
      <ReceiptsList />
    </View>
  );
};
export default App;
