import React from 'react';
import { isWindows } from '../../global/utils/platform';
import { Platform, StyleProp, ViewStyle } from 'react-native';

const Modal = Platform.select({
  windows: () => require('react-native-windows').Popup,
  default: () => require('react-native-modal').default,
})();

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
    <Modal style={style} isOpen={isVisible} onDismiss={onBackButtonPress}>
      {children}
    </Modal>
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
