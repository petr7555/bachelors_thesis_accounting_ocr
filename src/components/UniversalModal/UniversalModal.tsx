import Modal from 'react-native-modal';
import { Popup } from 'react-native-windows';
import React from 'react';
import { isWindows } from '../../global/utils/platform';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
  onBackButtonPress: () => void;
  children: React.ReactNode;
};

export const UniversalModal = ({
  isVisible,
  onBackdropPress,
  onBackButtonPress,
  children,
}: Props) =>
  isWindows ? (
    <Popup isOpen={isVisible} onDismiss={onBackButtonPress}>
      {children}
    </Popup>
  ) : (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}>
      {children}
    </Modal>
  );
