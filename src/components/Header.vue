<template>
  <v-toolbar :elevation="8" title="">
    <v-btn to="/">Jira Analytics</v-btn>
    <v-btn to="/resources">Resources</v-btn>
    <v-btn to="/dashboard">Dashboard</v-btn>
    <div class="text-center leftSide">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-if="token"
            :prepend-avatar="user?.picture"
            :title="user?.name"
            :subtitle="user?.email"
            v-bind="props"
          />
          <div v-if="!token">
            <v-btn :href="$utils.url.buildAuthUrl().toString()">Login via Atlassian</v-btn>
          </div>
        </template>

        <v-list class="userDropDown">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="itemName(item.title)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { useUserStore } from '@/store/user';
import User from '@/adapters/User';

const userStore = useUserStore();
const user: Ref<User | null> = ref(null);
const items = ref([{ title: 'Log out' }]);
const token: Ref<string | null> = ref(localStorage.getItem('token'));
const getUser = (): void => {
  userStore.getUser().then((loadedUser: User | null) => {
    user.value = loadedUser;
  });
};
const itemName = (itemName: string): void => {
  switch (itemName) {
    case 'Log out':
      localStorage.removeItem('token');
      window.location.reload();
      console.log(1);
  }
};
onBeforeMount(() => {
  getUser();
});
</script>

<style scoped>
.leftSide {
  margin-left: auto;
  padding-right: 1%;
}

.userDropDown {
  margin-left: auto;
  min-width: 50%;
  cursor: pointer;
}

.userDropDown :hover {
  background-color: #f6f6f6;
}
</style>
