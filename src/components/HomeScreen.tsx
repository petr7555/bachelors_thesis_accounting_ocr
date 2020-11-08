import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import UsersList from './UsersList';

declare const global: {HermesInternal: null | {}};

const HomeScreen = () => {
  const {colors} = useTheme();

  return (
    <>
      {__DEV__ && global.HermesInternal && (
        <View style={styles.engine}>
          <Text style={{color: colors.text}}>Engine: Hermes</Text>
        </View>
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: colors.text}}>Home!</Text>
        <UsersList />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
});

export default HomeScreen;
