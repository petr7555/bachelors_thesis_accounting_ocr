import ScanButton from './ScanButton';
import React from 'react';
import { create } from 'react-test-renderer';
import Icon from 'react-native-vector-icons/Ionicons';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';

describe('ScanButton', () => {
  it('renders scan icon', () => {
    const tree = create(<MockedNavigator component={ScanButton} />);
    const rootElement = tree.root;
    const icons = rootElement.findAllByType(Icon);
    expect(icons[0].props.name).toBe('scan');
  });
});
