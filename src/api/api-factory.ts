import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from '@/config';
import errorInterceptors from '@/api/error-interceptors';

const TIMEOUT = 10000;

export default function createApiInstance(): AxiosInstance {
  const api = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.response.use((response: AxiosResponse) => response, errorInterceptors);

  return api;
}
