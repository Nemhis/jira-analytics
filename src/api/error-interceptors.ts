import { AxiosError } from 'axios';
import Router from '@/router';
import { Routes } from '@/router/routes';
import { HTTPStatus } from '@/const';
import TokenStorage from '@/api/modules/TokenStorage';

export default function errorInterceptors(error: AxiosError): AxiosError {
  if (error.response) {
    if (error.response.status === HTTPStatus.UNAUTHORIZED) {
      TokenStorage.remove();
      Router.push(Routes.LOGIN).then();
    }
  }

  throw error;
}
