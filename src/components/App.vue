<template>
  <app-header v-if="user" :user="user" />
  <router-view />
</template>

<script lang="ts" setup>
import TokenStorage from '@/TokenStorage';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import AppHeader from '@/components/AppHeader.vue';

const userStore = useUserStore();
const { user } = storeToRefs(useUserStore());
onMounted(() => {
  if (TokenStorage.has()) {
    userStore.getUser().then();
  }
});
</script>
<style lang="scss">
@import '@/styles/index';
</style>
