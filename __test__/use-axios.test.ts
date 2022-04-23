import { act, renderHook } from '@testing-library/react-hooks';
import { useAxios } from '../src';

import { server } from '../src/mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('useAxios hook status testing.', () => {
  it('should return status idle', () => {
    const { result } = renderHook(() => useAxios());
    expect(result.current[0]).toBe('idle');
  });

  it('should return status pending', () => {
    const { result } = renderHook(() => useAxios());
    act(() => {
      result.current[1]({ method: 'GET', url: '/users' });
    });
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[1]({ method: 'GET', url: '/users' });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[1]({ method: 'GET', url: '/us' });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('error');
  });
});

// describe('useAxios hook CREATE testing.', () => {});

// describe('useAxios hook UPDATE testing.', () => {});

// describe('useAxios hook READ testing.', () => {});

// describe('useAxios hook DELETE testing.', () => {});

// describe('useAxios hook data error catching.', () => {});
