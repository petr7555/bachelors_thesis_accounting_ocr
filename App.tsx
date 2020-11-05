import * as React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import NewReceiptScreen from './src/components/NewReceiptScreen';
import {Theme} from '@react-navigation/native/lib/typescript/src/types';

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

const CameraScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Camera!</Text>
    </View>
  );
};

const SettingsScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text}}>Settings!</Text>
    </View>
  );
};

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

const Tab = createBottomTabNavigator();

const MyDefaultTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#078331',
  },
};

const MyDarkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#078331',
  },
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: getTabBarIcon('camera-outline'),
        }}
      />
      <Tab.Screen
        name="New receipt"
        component={NewReceiptScreen}
        options={{
          tabBarIcon: getTabBarIcon('scan'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
