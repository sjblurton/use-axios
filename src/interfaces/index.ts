import { AxiosRequestConfig, Method } from 'axios';

export type Status = 'idle' | 'pending' | 'success' | 'error';

export interface AxiosWithMethodAndUrl<D = any> extends AxiosRequestConfig<D> {
  url: string;
  method: Method;
}
