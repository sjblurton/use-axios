import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AxiosWithMethodAndUrl, Status } from '../interfaces';

export function useAxios<D = any, T = any>(): [
  Status,
  React.Dispatch<React.SetStateAction<AxiosWithMethodAndUrl<D> | undefined>>,
  AxiosError<T, D> | undefined,
  AxiosResponse<T, D> | undefined
] {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [axiosReq, setAxiosReq] = useState<
    AxiosWithMethodAndUrl<D> | undefined
  >(undefined);
  const [axiosRes, setAxiosRes] = useState<AxiosResponse<T, D> | undefined>(
    undefined
  );

  useEffect(() => {
    const call = async () => {
      if (axiosReq?.url) {
        try {
          setStatus('pending');
          const res: AxiosResponse<T, D> = await axios.request(axiosReq);
          setAxiosRes(res);
          setStatus('success');
        } catch (error) {
          setStatus('error');
          setError(error as AxiosError);
        }
      }
    };

    call();
  }, [axiosReq]);

  return [status, setAxiosReq, error, axiosRes];
}
