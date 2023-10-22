import TokenStorage from '@/TokenStorage';
import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import User from '@/adapters/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {},
  actions: {
    getAccessToken(tmpAccessCode: string): Promise<void> {
      return this.$api.auth.getAccessToken(tmpAccessCode).then(({ data }: AxiosResponse) => {
        TokenStorage.set(String(data['access_token']));
        this.$api.atlassian.setDefaultToken(TokenStorage.get());
      });
    },
    getUser(): Promise<User | null> {
      return this.$state.user
        ? Promise.resolve(this.$state.user)
        : this.$api.atlassian.getUser().then(({ data }: AxiosResponse) => {
            this.$state.user = data ? User.fromRaw(data) : null;
            return this.$state.user;
          });
    },
    logout(): void {
      TokenStorage.remove();
      this.$state.user = null;
    },
  },
});
