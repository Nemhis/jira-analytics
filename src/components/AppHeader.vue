<template>
  <v-toolbar v-if="user" :elevation="8" class="header">
    <v-toolbar-title class="header__title">Jira Analytics</v-toolbar-title>
    <v-btn :to="Routes.RESOURCES">Resources</v-btn>
    <v-spacer />
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-list class="header__user">
          <v-list-item :prepend-avatar="user.picture" :title="user.name" :subtitle="user.email" v-bind="props" />
        </v-list>
      </template>
      <v-list class="header__dropdown">
        <v-list-item @click="logOut">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
  max-width: 180px;
  text-transform: uppercase !important;
}

.header__user {
  background-color: transparent !important;
}

.header__dropdown {
  margin-left: auto;
  min-width: 50%;
  cursor: pointer;

  &:hover {
    background-color: $gray;
  }
}
</style>
