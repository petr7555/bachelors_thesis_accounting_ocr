import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ImageThumbnail from './ImageThumbnail';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

export const Basic = () => (
  <ImageThumbnail
    uri="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f0/0f/receipt.jpg"
    onPress={action('onPress')}
    text={text('Thumbnail text', 'Receipt')}
  />
);

storiesOf('ImageThumbnail', module).add('Basic', Basic);

export default {
  title: 'ImageThumbnail',
};
