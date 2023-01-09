<template>
  <v-toolbar :elevation="8" v-if="user" class="header">
    <v-toolbar-title class="header__title">Jira Analytics</v-toolbar-title>
    <v-btn :to="Routes.RESOURCES">Resources</v-btn>
    <v-spacer />
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-list-item :prepend-avatar="user.picture" :title="user.name" :subtitle="user.email" v-bind="props" />
        </template>
        <v-list class="header__dropdown">
          <v-list-item @click="logOut">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { Routes } from '@/router/routes';
import { storeToRefs } from 'pinia';
import Router from '@/router';

const userStore = useUserStore();
const { user } = storeToRefs(useUserStore());

const logOut = (): void => {
  userStore.logout();
  Router.push(Routes.LOGIN).then();
};
</script>

<style lang="scss">
@import '~@/styles/colors';

.header {
  display: flex;
}

.header__title {
  max-width: 150px;
  text-transform: uppercase;
}

.header__dropdown {
  margin-left: auto;
  min-width: 50%;
  cursor: pointer;

  & :hover {
    background-color: $gray;
  }
}
</style>
