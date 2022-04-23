import { act, renderHook } from '@testing-library/react-hooks';
import { useAxios } from '../src';
import { MockUser, UserInput } from '../src/interfaces';
import { errorMessages, mockUsers, urls } from '../src/mocks/data';

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
      result.current[3]({ method: 'GET', url: urls.users });
    });
    expect(result.current[0]).toBe('pending');
  });

  it('should return status success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ method: 'GET', url: urls.users });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toBe('success');
  });

  it('should return status error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ method: 'GET', url: urls.error404 });
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
      result.current[3]({
        method: 'POST',
        url: urls.users,
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.status).toBe(200);
  });

  it('should post and respond with data input', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[3]({
        method: 'POST',
        url: urls.users,
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.data?.createdAt).toBe('23/04/2022');
  });
});

describe('useAxios hook UPDATE testing.', () => {
  it('should post and respond status 200', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[3]({
        method: 'PUT',
        url: urls.editUser,
        params: { id: 3 },
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.status).toBe(200);
  });
  it('should update and respond with data sent.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[3]({
        method: 'PUT',
        url: urls.editUser,
        data: { name: 'Bob', username: 'Robob' },
      });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.data.id).toBe(4);
  });
});

describe('useAxios hook READ testing.', () => {
  it('should return the array of users', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ method: 'GET', url: urls.users });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.data).toEqual(mockUsers);
  });
});

describe('useAxios hook DELETE testing.', () => {
  it('should respond with 204 status.', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios<UserInput, MockUser>()
    );
    act(() => {
      result.current[3]({
        method: 'DELETE',
        url: urls.editUser,
      });
    });
    await waitForNextUpdate();
    expect(result.current[1]?.status).toBe(204);
  });
});

describe('useAxios hook data error catching.', () => {
  it('should return an error object', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ url: urls.error404, method: 'GET' });
    });
    await waitForNextUpdate();
    expect(result.current[2]?.isAxiosError).toBeTruthy();
  });
  it('should return an 404 error message', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ url: urls.error404, method: 'GET' });
    });
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(errorMessages.error404);
  });
  it('should return an 500 error message', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAxios());
    act(() => {
      result.current[3]({ url: urls.error500, method: 'GET' });
    });
    await waitForNextUpdate();
    expect(result.current[2]?.message).toBe(errorMessages.error500);
  });
});
