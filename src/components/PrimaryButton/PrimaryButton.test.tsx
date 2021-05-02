import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from './PrimaryButton';

test('onPress event is triggered when the button is pressed', () => {
  const mockFn = jest.fn();

  const { getByText } = render(
    <PrimaryButton onPress={mockFn} title="Submit" />,
  );

  fireEvent.press(getByText('Submit'));

  expect(mockFn).toBeCalled();
});
