import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ToastIcon from './ToastIcon';

export const Basic = () => <ToastIcon name="checkmark" />;
Basic.parameters = {
  backgrounds: { default: 'black' },
};

storiesOf('ToastIcon', module)
  .addParameters({
    backgrounds: [
      { name: 'black', value: '#000', default: true },
      { name: 'white', value: '#fff' },
    ],
  })
  .add('Basic', Basic);

export default {
  title: 'ToastIcon',
};
