import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

export const Basic = () => {
  const [visible, setVisible] = useState(true);
  return (
    <ConfirmationModal
      isVisible={visible}
      id="123"
      onConfirm={action('onConfirm')}
      onCancel={() => {
        action('onCancel')();
        setVisible(false);
      }}
      text={text('Confirmation text', 'Remove this item?')}
    />
  );
};

storiesOf('ConfirmationModal', module).add('Basic', Basic);

export default {
  title: 'Modals/ConfirmationModal',
};
