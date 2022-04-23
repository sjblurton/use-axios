import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AxiosWithMethodAndUrl, Status } from '../interfaces';

export function useAxios<D = any, T = any>(): [
  Status,
  AxiosResponse<T, D> | undefined,
  AxiosError<T, D> | undefined,
  React.Dispatch<React.SetStateAction<AxiosWithMethodAndUrl<D> | undefined>>
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
    let isActive = true;
    const call = async () => {
      if (axiosReq?.url) {
        try {
          setStatus('pending');
          const res: AxiosResponse<T, D> = await axios.request(axiosReq);
          if (isActive) {
            setAxiosRes(res);
            setStatus('success');
          }
        } catch (error) {
          if (isActive) {
            setStatus('error');
            setError(error as AxiosError);
          }
        }
      }
    };
    call();
    return () => {
      isActive = false;
    };
  }, [axiosReq]);

  return [status, axiosRes, error, setAxiosReq];
}
