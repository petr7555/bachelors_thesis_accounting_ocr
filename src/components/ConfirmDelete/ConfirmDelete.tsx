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
      <Text>Remove this item?</Text>
      <Button
        containerStyle={styles.buttonContainer}
        title="Remove"
        onPress={onDelete}
        icon={<Icon style={styles.icon} name="trash" size={25} color="white" />}
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Cancel"
        onPress={onCancel}
        icon={
          <Icon
            style={styles.icon}
            name="return-up-back"
            size={25}
            color="white"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.primary,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    left: 40, // Keep some space between your left border and Image
  },
});

export default ConfirmDelete;
