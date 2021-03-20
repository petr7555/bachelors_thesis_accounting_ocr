import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Camera from '../CameraScreen/CameraScreen';
import Colors from '../../global/styles/colors';

const ScanButton = () => {
  const [processing, setProcessing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showModal}
        style={styles.roundButton}
        disabled={processing}>
        {processing ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Icon style={styles.icon} name="scan" />
        )}
      </TouchableOpacity>
      <Modal
        style={styles.modalView}
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <Camera
          setModalVisible={setModalVisible}
          setProcessing={setProcessing}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    color: Colors.white,
    fontSize: 50,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: 100,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
    borderRadius: 100,
    borderWidth: 5,
    height: 90,
    justifyContent: 'center',
    marginBottom: 10,
    width: 90,
  },
});

export default ScanButton;
