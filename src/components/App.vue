<template>
  <app-header v-if="user" :user="user" />
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { useUserStore } from '@/store/user';
import TokenStorage from '@/TokenStorage';
import { storeToRefs } from 'pinia';

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
