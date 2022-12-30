import { AxiosError } from 'axios';
import Router from '@/router';
import { Routes } from '@/router/routes';
import { HTTPStatus } from '@/const';

export default function errorInterceptors(error: AxiosError): AxiosError {
  if (error.response) {
    if (error.response.status === HTTPStatus.UNAUTHORIZED) {
      localStorage.removeItem('token');
      Router.push(Routes.LOGIN).then();
    }
  }

  throw error;
}
