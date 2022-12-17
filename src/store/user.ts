import { defineStore } from 'pinia';
import User from '@/adapters/User';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {},
  actions: {
    loadUser(): Promise<User> {
      return this.$api.user.login({ email: '', password: '' }).then(({ data }) => {
        this.user = User.fromRaw(data);

        return this.user;
      });
    },
  },
});
