import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';

export default class AuthApi extends AbstractApi {
  getAccessToken(code: string): Promise<AxiosResponse> {
    return this.api.get('/login/access-token', { params: { code } });
  }
}
