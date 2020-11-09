import React, {useState} from 'react';
import HomeScreen from './HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraScreen from './CameraScreen';
import SettingsScreen from './SettingsScreen';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../global/styles/colors';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

const ScanComponent = () => {
  return null;
};

const ScanButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={toggleModal} style={styles.roundButton}>
        <Icon name={'scan'} color={'white'} size={50} />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}>
        <View style={{flex: 1}}>
          <CameraScreen />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.secondary,
  },
});

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
        name="Pay"
        component={ScanComponent}
        options={{
          tabBarButton: () => <ScanButton />,
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
