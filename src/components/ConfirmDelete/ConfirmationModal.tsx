import Modal from 'react-native-modal';
import ConfirmDelete from './ConfirmDelete';
import React from 'react';

type Props = {
  isVisible: boolean;
  id: string;
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

const ConfirmationModal = ({ isVisible, id, onConfirm, onCancel }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}>
      <ConfirmDelete
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
