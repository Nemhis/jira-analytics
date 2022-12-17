import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import { useUserStore } from '@/store/user';
import User from '@/adapters/User';

export default defineComponent({
  name: 'Login',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useUserStore();

    return {
      store,
    };
  },
  data: () => ({
    user: null as User | null,
  }),
  methods: {
    login(): void {
      this.store.loadUser().then((user: User) => {
        this.user = user;
      });
    },
  },
});
