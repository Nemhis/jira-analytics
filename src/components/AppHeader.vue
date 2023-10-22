<template>
  <div class="app-header">
    <template v-if="mdAndDown">
      <div
        v-if="drawerIsActive && mdAndDown"
        @click="drawerIsActive = false"
        class="app-header__mobile-drawer-background"
      />
      <v-card>
        <v-layout>
          <v-app-bar density="compact" class="app-header__menu">
            <template #prepend>
              <v-app-bar-nav-icon @click="drawerIsActive = !drawerIsActive" />
            </template>
            <v-app-bar-title>{{ title }}</v-app-bar-title>
            <v-list-item :prepend-avatar="props.user.picture" />
          </v-app-bar>
        </v-layout>
      </v-card>

      <v-card v-if="drawerIsActive">
        <v-layout>
          <v-navigation-drawer v-model="drawerIsActive" temporary>
            <v-list class="app-header__menu">
              <v-list-item :title="props.user.name" :subtitle="props.user.email" />
            </v-list>
            <v-divider />
            <v-list density="compact" class="app-header__mobile-drawer" nav>
              <v-list-item :to="Routes.RESOURCES" @click="drawerIsActive = !drawerIsActive">Resources</v-list-item>
              <v-list-item @click="logOut" class="app-header__mobile-drawer-logout">Log out</v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-layout>
      </v-card>
    </template>

    <v-card v-else>
      <v-layout>
        <v-app-bar class="app-header__menu">
          <v-app-bar-title class="app-header__title">{{ title }}</v-app-bar-title>
          <v-btn :to="Routes.RESOURCES">Resources</v-btn>
          <v-spacer />
          <v-menu open-on-hover>
            <template #activator="{ props: menu }">
              <v-list bg-color="transparent">
                <v-list-item
                  v-bind="menu"
                  :prepend-avatar="props.user.picture"
                  :title="props.user.name"
                  :subtitle="props.user.email"
                />
              </v-list>
            </template>
            <v-list class="app-header__dropdown">
              <v-list-item @click="logOut">
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import Router from '@/router';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import User from '@/adapters/User';
import { useUserStore } from '@/store/user';
import { Routes } from '@/router/routes';

const title = 'Jira analytics';
const { mdAndDown } = useDisplay();
const userStore = useUserStore();
const props = defineProps<{ user: User }>();
const drawerIsActive = ref(false);
const logOut = (): void => {
  userStore.logout();
  Router.push(Routes.LOGIN).then();
  drawerIsActive.value = false;
};
</script>

<style lang="scss">
@import '../styles/colors';
@import '../styles/vars';

.app-header {
  position: relative;
  height: 64px;
  z-index: 1000;
}

.app-header__menu {
  height: 64px;
  justify-content: center;
}

.app-header__mobile-drawer {
  height: 90%;
}

.app-header__mobile-drawer-logout {
  position: absolute;
  bottom: 10px;
  width: 95%;
}

.app-header__mobile-drawer-background {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $black;
  opacity: 0.3;
}

.app-header__title {
  max-width: 180px;
  text-transform: uppercase;
}

.app-header__dropdown {
  margin-left: auto;
  min-width: 50%;
  cursor: pointer;

  &:hover {
    background-color: $gray;
  }
}
</style>
