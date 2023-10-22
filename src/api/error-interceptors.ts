import TokenStorage from '@/TokenStorage';
import Router from '@/router';
import { AxiosError } from 'axios';
import { HTTPStatus } from '@/const';
import { Routes } from '@/router/routes';

export default function errorInterceptors(error: AxiosError): AxiosError {
  if (error.response) {
    if (error.response.status === HTTPStatus.UNAUTHORIZED) {
      TokenStorage.remove();
      Router.push(Routes.LOGIN).then();
    }
  }

  throw error;
}
