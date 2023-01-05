<template>
  <div class="login">
    <v-btn :href="$utils.url.buildAuthUrl().toString()"> Login via Atlassian</v-btn>
    <p v-if="error"><b>ошибка:</b> {{ error || '-' }}</p>
    <v-progress-circular v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { Raw } from '@/@types/Raw';
import { LocationQuery, useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import TokenStorage from '@/api/modules/TokenStorage';
import { Routes } from '@/router/routes';

const props = defineProps<{ query: LocationQuery }>();
const error: Ref<Raw | null> = ref(null);
const userStore = useUserStore();
const isLoading: Ref<boolean> = ref(false);
const localToken = TokenStorage.get();
const router = useRouter();

onMounted(() => {
  if (localToken) {
    router.push(Routes.RESOURCES);
  }
  if (!props.query.code || localToken) {
    return;
  }
  isLoading.value = true;

  userStore
    .getAccessToken(String(props.query.code))
    .then(() => {
      window.location.reload();
    })
    .catch(({ response }: AxiosError) => {
      error.value = response ? (response.data as Raw) : null;
    })
    .finally(() => (isLoading.value = false));
});
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
