import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ConfirmDelete from './ConfirmDelete';

export const Basic = () => (
  <ConfirmDelete
    text={text('Confirmation text', 'Remove this item?')}
    onDelete={action('onDelete')}
    onCancel={action('onCancel')}
  />
);

storiesOf('ConfirmDelete', module).add('Basic', Basic);

export default {
  title: 'ConfirmDelete',
};
