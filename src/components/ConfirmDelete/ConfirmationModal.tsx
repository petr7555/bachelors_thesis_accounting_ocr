import ConfirmDelete from './ConfirmDelete';
import React from 'react';
import { UniversalModal } from '../UniversalModal/UniversalModal';

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
    <UniversalModal
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
    </UniversalModal>
  );
};

export default ConfirmationModal;
