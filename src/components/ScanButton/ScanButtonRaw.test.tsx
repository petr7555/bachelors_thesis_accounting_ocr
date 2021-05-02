import React from 'react';
import { create } from 'react-test-renderer';
import Icon from 'react-native-vector-icons/Ionicons';
import ScanButtonRaw from './ScanButtonRaw';
import { ActivityIndicator } from 'react-native';

describe('ScanButtonRaw', () => {
  it('not processing scan button has scan Icon', () => {
    const renderer = create(
      <ScanButtonRaw onPress={() => {}} processing={false} />,
    );
    const rootElement = renderer.root;
    const icons = rootElement.findAllByType(Icon);
    expect(icons[0].props.name).toBe('scan');
  });

  it('processing scan button has ActivityIndicator', () => {
    const renderer = create(
      <ScanButtonRaw onPress={() => {}} processing={true} />,
    );
    const rootElement = renderer.root;
    const activityIndicators = rootElement.findAllByType(ActivityIndicator);
    expect(activityIndicators.length).toBe(1);
  });
});
