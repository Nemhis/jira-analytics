import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ATLASSIAN_API_URL, AUTH_API_URL, JIRA_API_URL } from '@/config';
import errorInterceptors from '@/api/error-interceptors';
import TokenStorage from '@/TokenStorage';

const TIMEOUT = 10000;

export const createProxy = (): AxiosInstance => {
  const api = axios.create({
    baseURL: AUTH_API_URL,
    timeout: TIMEOUT,
    withCredentials: false,
  });

  api.interceptors.response.use((response: AxiosResponse) => response, errorInterceptors);

  return api;
};

export const createJira = (): AxiosInstance => {
  const token = TokenStorage.get();

  const api = axios.create({
    baseURL: JIRA_API_URL,
    timeout: TIMEOUT,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  api.interceptors.response.use((response: AxiosResponse) => response, errorInterceptors);

  return api;
};

export const createAtlassian = (): AxiosInstance => {
  const token = TokenStorage.get();

  const api = axios.create({
    baseURL: ATLASSIAN_API_URL,
    timeout: TIMEOUT,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  api.interceptors.response.use((response: AxiosResponse) => response, errorInterceptors);

  return api;
};
