import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { Status } from '../interfaces';

const getFetcher = (url: string) => axios.get(url).then(res => res.data);

export function useAxiosGet<D = any>(
  url: string
): [
  status: Status,
  data: D | undefined,
  error: AxiosError<D, D> | undefined,
  mutate: KeyedMutator<D>,
] {
  const [status, setStatus] = useState<Status>('idle');
  const { data, isValidating, mutate, error } = useSWR<D, AxiosError<D>>(url, getFetcher);

  useEffect(() => {
    let isActive = true;
    if(isActive){
      if ((!data && !error) || isValidating) return setStatus('pending');
      if (error) return setStatus('error');
      if (data && !isValidating) return setStatus('success');
    }
        return () => {
      isActive = false;
    };
  }, [data, status, isValidating, error]);

  return [ status, data, error, mutate ];
}
