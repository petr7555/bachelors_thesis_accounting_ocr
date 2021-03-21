import Modal from 'react-native-modal';
import ConfirmDelete from './ConfirmDelete';
import React from 'react';

type Props = {
  isVisible: boolean;
  id: string;
  text?: string;
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  isVisible,
  id,
  text = 'Remove this item?',
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}>
      <ConfirmDelete
        text={text}
        onDelete={() => {
          onCancel();
          onConfirm(id);
        }}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default ConfirmationModal;
