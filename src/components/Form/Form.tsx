import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useTheme } from '@react-navigation/native';

type FormData = {
  description: string;
  total: number;
};

type Props = {
  initialData: any;
};

const Form = ({ initialData }: Props) => {
  const theme = useTheme();
  const { control, handleSubmit, errors, reset } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    reset();
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ ...styles.input, color: theme.colors.text }}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            placeholder="description"
          />
        )}
        name="description"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.description && <Text>This field is required.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={{ ...styles.input, color: theme.colors.text }}
            onBlur={onBlur}
            onChangeText={(inputValue) => onChange(inputValue)}
            value={value}
            placeholder="total"
            keyboardType="numeric"
          />
        )}
        name="total"
        rules={{
          required: true,
          pattern: {
            value: /^[-+]?\d*\.?\d*$/,
            message: 'Please enter valid number',
          },
        }}
        defaultValue=""
      />
      {errors.total && (
        <Text>
          {errors.total.message
            ? errors.total.message
            : 'This field is required'}
        </Text>
      )}

      <Button
        color={theme.colors.primary}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Form;
