import getNavigationIcon from './getNavigationIcon';
import { create } from 'react-test-renderer';
import Icon from 'react-native-vector-icons/Ionicons';

it('creates an Icon with name, color and size', () => {
  const name = 'receipt';
  const color = 'red';
  const size = 20;

  const renderer = create(getNavigationIcon(name)({ color, size }));

  const icon = renderer.root.findByType(Icon);

  expect(icon.props).toMatchObject({ name, color, size });
});
