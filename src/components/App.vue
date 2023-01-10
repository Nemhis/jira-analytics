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

onMounted(() => {
  if (TokenStorage.has()) {
    userStore.getUser().then();
  }
});
</script>
<style lang="scss">
@import '@/styles/index';
</style>
