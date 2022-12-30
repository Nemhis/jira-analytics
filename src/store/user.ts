import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import User from '@/adapters/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {},
  actions: {
    getAccessToken(tmpAccessCode: string): Promise<string> {
      return this.$api.auth
        .getAccessToken(tmpAccessCode)
        .then(({ data }: AxiosResponse) => String(data['access_token']));
    },
    getUser(): Promise<User | null> {
      return this.$api.atlassian.getUser().then(({ data }: AxiosResponse) => {
        this.$state.user = data ? User.fromRaw(data) : null;

        return this.$state.user;
      });
    },
  },
});
