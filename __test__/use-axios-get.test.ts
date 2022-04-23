import { act, renderHook } from '@testing-library/react-hooks';
import { useAxiosGet } from '../src';
import { mockUsers, urls } from '../src/mocks/data';

import { server } from '../src/mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('useAxiosGet hook status testing.', () => {
  it('should return status pending', () => {
    const { result } = renderHook(() => useAxiosGet(urls.users));
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.users)
    );
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.error404)
    );
    await waitForNextUpdate();
    expect(result.current[0]).toBe('error');
  });

  it('should return status pending after mutation.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.users)
    );
    await waitForNextUpdate();
    act(() => {
      result.current[3]();
    });
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success after mutation complete.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.users)
    );
    await waitForNextUpdate();
    act(() => {
      result.current[3]();
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });
});

describe('useAxiosGet hook READ testing.', () => {
  it('should return data.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.users)
    );
    await waitForNextUpdate();
    expect(result.current[1]).toEqual(mockUsers);
  });
});

describe('useAxiosGet hook MUTATE function testing.', () => {
  it('should have data after mutation complete.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.users)
    );
    await waitForNextUpdate();
    act(() => {
      result.current[3]();
    });
    await waitForNextUpdate();
    expect(result.current[1]).toEqual(mockUsers);
  });
});

describe('useAxiosGet ERROR messaging testing.', () => {
  it('should return an error object', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.error404)
    );
    await waitForNextUpdate();
    expect(result.current[2]?.isAxiosError).toBeTruthy();
  });
  it('should return an 404 error message', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.error404)
    );
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(
      'Request failed with status code 404'
    );
  });
  it('should return an 500 error message', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxiosGet(urls.error500)
    );
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(
      'Request failed with status code 500'
    );
  });
});
