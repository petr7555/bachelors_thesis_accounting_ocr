import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../global/styles/colors';

type Props = {
  onDelete: () => void;
  onCancel: () => void;
};

const ConfirmDelete = ({ onDelete, onCancel }: Props) => {
  return (
    <View style={styles.content}>
      <Text style={styles.confirmationText}>Remove this item?</Text>
      <Button
        containerStyle={styles.buttonContainer}
        title="Remove"
        onPress={onDelete}
        icon={<Icon style={styles.icon} name="trash" />}
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Cancel"
        onPress={onCancel}
        icon={<Icon style={styles.icon} name="return-up-back" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
  },
  confirmationText: {
    fontSize: 20,
    paddingBottom: 15,
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
  icon: {
    color: Colors.white,
    fontSize: 25,
    left: 40, // Keep some space between your left border and Image
    position: 'absolute',
  },
});

export default ConfirmDelete;
