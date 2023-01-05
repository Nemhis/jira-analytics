<template>
  <app-header />
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import { useUserStore } from '@/store/user';

const token: Ref<string> = ref('');
const userStore = useUserStore();
const localToken = localStorage.getItem('token') || null;

const getUser = (): void => {
  userStore.getUser().then();
};

if (localToken) {
  token.value = localToken;
}

onBeforeMount(() => {
  if (token.value) {
    getUser();
  }
});
</script>
<style lang="scss">
@import '@/styles/index';
</style>
