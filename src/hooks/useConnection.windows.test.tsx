import { renderHook } from '@testing-library/react-hooks';
import useConnection from './useConnection.windows';

it('should always return online', () => {
  const { result } = renderHook(() => useConnection());

  expect(result.current.isOffline).toBe(false);
});
