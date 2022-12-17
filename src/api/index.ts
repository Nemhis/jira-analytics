import { AxiosInstance } from 'axios';
import UserApi from '@/api/modules/UserApi';

export default class Api {
  private readonly apiInstance: AxiosInstance;
  public user: UserApi;

  constructor(api: AxiosInstance) {
    this.apiInstance = api;
    this.user = new UserApi(this.apiInstance);
  }
}
