import { act, renderHook } from '@testing-library/react-hooks';
import { useAxios } from '../src';
import { MockUser, UserInput } from '../src/interfaces';
import { urls } from '../src/mocks/data';

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
      result.current[1]({ method: 'GET', url: urls.users });
    });
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[1]({ method: 'GET', url: urls.users });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[1]({ method: 'GET', url: urls.error404 });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('error');
  });
});

describe('useAxios hook CREATE testing.', () => {
  it('should post and respond status 200', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[1]({
        method: 'POST',
        url: urls.users,
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[3]?.status).toBe(200);
  });

  it('should post and respond with data input', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[1]({
        method: 'POST',
        url: urls.users,
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[3]?.data?.createdAt).toBe('23/04/2022');
  });
});

// describe('useAxios hook UPDATE testing.', () => {});

// describe('useAxios hook READ testing.', () => {});

// describe('useAxios hook DELETE testing.', () => {});

// describe('useAxios hook data error catching.', () => {});
