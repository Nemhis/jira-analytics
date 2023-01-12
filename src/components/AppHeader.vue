<template>
  <div v-if="drawerIsActive" @click="drawerIsActive = false" class="app-header__mobile-drawer-background" />
  <div v-if="user">
    <v-toolbar :elevation="8" class="app-header__desktop app-header">
      <v-toolbar-title class="app-header__title">Jira Analytics</v-toolbar-title>
      <v-btn :to="Routes.RESOURCES">Resources</v-btn>
      <v-spacer />
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-list class="app-header__user">
            <v-list-item :prepend-avatar="user.picture" :title="user.name" :subtitle="user.email" v-bind="props" />
          </v-list>
        </template>
        <v-list class="app-header__dropdown">
          <v-list-item @click="logOut">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-card class="app-header__mobile">
      <v-layout>
        <v-app-bar density="compact" class="app-header app-header_mobile-menu">
          <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawerIsActive = !drawerIsActive" />
          </template>
          <v-app-bar-title>Jira Analytics</v-app-bar-title>
          <v-list-item :prepend-avatar="user.picture" />
        </v-app-bar>
      </v-layout>
    </v-card>

    <v-card v-if="drawerIsActive" class="app-header app-header__mobile-drawer">
      <v-layout>
        <v-navigation-drawer v-model="drawerIsActive" temporary class="app-header">
          <v-list-item :title="user.name" :subtitle="user.email" class="app-header app-header_mobile-menu" />
          <v-divider />
          <v-list density="compact" class="app-header__mobile-drawer" nav>
            <v-list-item :to="Routes.RESOURCES" @click="drawerIsActive = !drawerIsActive">Resources</v-list-item>
            <v-list-item @click="logOut" class="app-header__mobile-drawer-logout">Log out</v-list-item>
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
const drawerIsActive = ref(false);
const logOut = (): void => {
  userStore.logout();
  Router.push(Routes.LOGIN).then();
  drawerIsActive.value = false;
};
</script>

<style lang="scss">
@import '~@/styles/colors';
@import '~@/styles/screenSize';

.app-header {
  background-color: #eee !important;
}

.app-header__desktop {
  display: none;
}

.app-header__mobile-menu {
  height: 8%;
  justify-content: center !important;
}

.app-header__mobile-drawer {
  z-index: 100 !important;
  height: 90%;
}

.app-header__mobile-drawer-logout {
  position: absolute !important;
  bottom: 10px;
  width: 95%;
}

.app-header__mobile-drawer-background {
  position: absolute;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: $black;
  opacity: 0.3;
}

@media screen and (min-width: $screen-sm) {
  .app-header__mobile {
    display: none;
  }

  .app-header__desktop {
    visibility: visible;
  }

  .app-header_mobile-menu {
    display: none;
  }

  .app-header__mobile-drawer {
    display: none;
  }

  .app-header__mobile-drawer-logout {
    display: none;
  }

  .app-header__mobile-drawer-background {
    display: none;
  }

  .app-header__title {
    max-width: 180px;
    text-transform: uppercase !important;
  }

  .app-header__user {
    background-color: transparent !important;
  }

  .app-header__dropdown {
    margin-left: auto;
    min-width: 50%;
    cursor: pointer;

    &:hover {
      background-color: $gray;
    }
  }
}
</style>
