<template>
  <app-header />
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { useUserStore } from '@/store/user';
import TokenStorage from '@/TokenStorage';

const userStore = useUserStore();
const hasToken = TokenStorage.hasToken();

onMounted(() => {
  if (hasToken) {
    userStore.getUser().then();
  }
});
</script>
<style lang="scss">
@import '@/styles/index';
</style>
