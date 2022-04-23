import { AxiosRequestConfig, Method } from 'axios';

export type Status = 'idle' | 'pending' | 'success' | 'error';

export interface AxiosWithMethodAndUrl<D = any> extends AxiosRequestConfig<D> {
  url: string;
  method: Method;
}

export interface MockUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
}

export type UserInput = Omit<MockUser, 'createdAt' | 'updatedAt' | 'id'>;
