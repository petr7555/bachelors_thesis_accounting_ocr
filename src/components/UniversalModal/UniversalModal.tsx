import Modal from 'react-native-modal';
import { Popup } from 'react-native-windows';
import React from 'react';
import { isWindows } from '../../global/utils/platform';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  isVisible: boolean;
  onBackdropPress: () => void;
  onBackButtonPress: () => void;
  children: React.ReactNode;
};

const UniversalModal = ({
  style,
  isVisible,
  onBackdropPress,
  onBackButtonPress,
  children,
}: Props) =>
  isWindows ? (
    <Popup style={style} isOpen={isVisible} onDismiss={onBackButtonPress}>
      {children}
    </Popup>
  ) : (
    <Modal
      style={style}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}>
      {children}
    </Modal>
  );

export default UniversalModal;
