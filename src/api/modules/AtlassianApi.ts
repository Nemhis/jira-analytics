import AbstractApi from '@/api/modules/AbstractApi';
import { AxiosResponse } from 'axios';

export default class AtlassianApi extends AbstractApi {
  getAccessibleResources(): Promise<AxiosResponse> {
    return this.api.get('/oauth/token/accessible-resources');
  }

  getUser(): Promise<AxiosResponse> {
    return this.api.get('/me');
  }
}
