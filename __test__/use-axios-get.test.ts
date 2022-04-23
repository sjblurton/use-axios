import { renderHook } from '@testing-library/react-hooks';
import { useAxiosGet } from '../src';

import { server } from '../src/mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('useAxios hook status testing.', () => {
  it('should return status pending', () => {
    const { result } = renderHook(() => useAxiosGet('/users'));
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet('/users')
    );
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxiosGet('/us'));
    await waitForNextUpdate();
    expect(result.current[0]).toBe('error');
  });
});

// describe('useAxios hook CREATE testing.', () => {});

// describe('useAxios hook UPDATE testing.', () => {});

// describe('useAxios hook READ testing.', () => {});

// describe('useAxios hook DELETE testing.', () => {});

// describe('useAxios hook data error catching.', () => {});
