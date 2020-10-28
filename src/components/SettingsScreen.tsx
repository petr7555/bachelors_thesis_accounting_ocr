import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemeOption, ThemeOptionsContext} from '../../App';
import {Picker} from '@react-native-picker/picker';

const SettingsScreen = () => {
  const [themeOption, setThemeOption] = useContext(ThemeOptionsContext);
  const [selected, setSelected] = useState(themeOption);

  const onValueChange = (itemValue: ThemeOption) => {
    setSelected(itemValue);
    setThemeOption && setThemeOption(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text>This is Settings screen</Text>
      <Picker
        selectedValue={selected}
        style={styles.picker}
        onValueChange={(itemValue, _itemIndex) =>
          onValueChange(itemValue as ThemeOption)
        }>
        <Picker.Item label="Reflect OS setting" value="reflectOS" />
        <Picker.Item label="Dark mode" value="dark" />
        <Picker.Item label="Light mode" value="light" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default SettingsScreen;
