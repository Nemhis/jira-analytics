import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';

export default class UserApi extends AbstractApi {
  status(): Promise<AxiosResponse> {
    return this.api.get('auth/status');
  }

  logout(): Promise<AxiosResponse> {
    return this.api.post('/auth/logout');
  }

  login(data: { email: string; password: string }): Promise<AxiosResponse> {
    return this.api.post('auth/login', data);
  }
}
