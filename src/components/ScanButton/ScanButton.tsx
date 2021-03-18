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
  const [isModalVisible, setModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

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
          <Icon name="scan" color="white" size={50} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: 100,
  },
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

export default ScanButton;
