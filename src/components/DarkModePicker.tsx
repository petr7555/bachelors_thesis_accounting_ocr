import {Picker} from '@react-native-community/picker';
import React, {useContext, useState} from 'react';
import {ThemeOption, ThemeOptionsContext} from '../../App';
import {StyleSheet} from 'react-native';

const DarkModePicker = () => {
  const [themeOption, setThemeOption] = useContext(ThemeOptionsContext);
  const [selected, setSelected] = useState(themeOption);

  const onValueChange = (itemValue: ThemeOption) => {
    setSelected(itemValue);
    setThemeOption && setThemeOption(itemValue);
  };

  return (
    <Picker
      selectedValue={selected}
      style={styles.picker}
      onValueChange={(itemValue, _itemIndex) =>
        onValueChange(itemValue as ThemeOption)
      }>
      <Picker.Item label="Reflect OS settings" value="reflectOS" />
      <Picker.Item label="Dark mode" value="dark" />
      <Picker.Item label="Light mode" value="light" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 200,
  },
});

export default DarkModePicker;
