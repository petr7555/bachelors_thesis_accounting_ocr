import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const getNavigationIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name={name} color={color} size={size} />;

export default getNavigationIcon;
