import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UniversalModal from '../UniversalModal/UniversalModal';
import Camera from '../CameraScreen/CameraScreen';
import ScanButtonRaw from './ScanButtonRaw';

const ScanButton = () => {
  const [processing, setProcessing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScanButtonRaw
        onPress={() => setModalVisible((visible) => !visible)}
        processing={processing}
      />
      <UniversalModal
        style={styles.modalView}
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}>
        <Camera
          setModalVisible={setModalVisible}
          setProcessing={setProcessing}
        />
      </UniversalModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: 100,
  },
});

export default ScanButton;
