<template>
  <div v-if="isActiveDrawer" @click="isActiveDrawer = false" class="menu-background" />
  <div v-if="user">
    <v-toolbar :elevation="8" class="header desktop">
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

    <v-card class="mobile">
      <v-layout>
        <v-app-bar density="compact" class="bar">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="isActiveDrawer = !isActiveDrawer" />
          </template>
          <v-app-bar-title>Jira Analytics</v-app-bar-title>
          <v-list-item :prepend-avatar="user.picture" />
        </v-app-bar>
      </v-layout>
    </v-card>

    <v-card v-if="isActiveDrawer" class="drawer">
      <v-layout>
        <v-navigation-drawer v-model="isActiveDrawer" temporary>
          <v-list-item :title="user.name" :subtitle="user.email" class="bar" />
          <v-divider />
          <v-list density="compact" class="drawer" nav>
            <v-list-item :to="Routes.RESOURCES" @click="isActiveDrawer = !isActiveDrawer">Resources</v-list-item>
            <v-list-item @click="logOut" class="drawer__logout">Log out</v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { Routes } from '@/router/routes';
import { storeToRefs } from 'pinia';
import Router from '@/router';
import { ref } from 'vue';

const userStore = useUserStore();
const { user } = storeToRefs(useUserStore());
const isActiveDrawer = ref(false);
const logOut = (): void => {
  userStore.logout();
  Router.push(Routes.LOGIN).then();
  isActiveDrawer.value = false;
};
</script>

<style lang="scss">
@import '~@/styles/colors';

@media screen and (min-width: 992px) {
  .mobile {
    visibility: hidden;
    max-width: 448px;
  }
}

@media screen and (max-width: 992px) {
  .desktop {
    visibility: hidden;
  }
}

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

.bar {
  height: 8%;
}

.drawer {
  z-index: 100 !important;
  height: 90%;
}

.drawer__logout {
  position: absolute !important;
  bottom: 10px;
}

.menu-background {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $black;
  opacity: 0.3;
}
</style>
