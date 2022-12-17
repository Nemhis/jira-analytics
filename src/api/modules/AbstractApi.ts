import { AxiosInstance } from 'axios';

export default abstract class AbstractApi {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
}
