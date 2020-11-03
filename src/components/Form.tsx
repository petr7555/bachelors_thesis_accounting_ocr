import React from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

type FormData = {
  description: string;
  total: number;
};

const Form = () => {
  const {control, handleSubmit, errors} = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
          />
        )}
        name="description"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.description && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
          />
        )}
        name="total"
        defaultValue={0}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default Form;
