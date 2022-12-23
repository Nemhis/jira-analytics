import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({}),
  getters: {},
  actions: {
    getAccessToken(tmpAccessCode: string): Promise<string> {
      return this.$api.auth
        .getAccessToken(tmpAccessCode)
        .then(({ data }: AxiosResponse) => String(data['access_token']));
    },
  },
});
