import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import UniversalModal from './UniversalModal';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import Colors from '../../global/styles/colors';

export const Basic = () => {
  const [visible, setVisible] = useState(true);
  return (
    <UniversalModal
      isVisible={visible}
      onBackdropPress={() => {
        action('onBackdropPress')();
        setVisible(false);
      }}
      onBackButtonPress={() => {
        action('onBackButtonPress')();
        setVisible(false);
      }}
      children={
        <View style={styles.modalContent}>
          {text('Modal text', 'This is text inside UniversalModal')}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
});

storiesOf('UniversalModal', module).add('Basic', Basic);

export default {
  title: 'Modals/UniversalModal',
};
