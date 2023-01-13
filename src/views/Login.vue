<template>
  <div class="login">
    <v-btn :href="$utils.url.buildAuthUrl().toString()" variant="plain" class="login__btn">
      <div class="login__btn-items">
        <!--        <img v-if="!isLoading" src="../../public/img/icons/atlassian-logo.png" alt="Atlassian icon" />-->
        <v-progress-circular v-if="isLoading" />
        <span class="login__btn-title">Login via atlassian</span>
      </div>
    </v-btn>
    <p v-if="error"><b>ошибка:</b> {{ error || '-' }}</p>

    <br />
    <br />
    <br />
    <div v-if="smAndDown">это видно начиная с разрешения 340 и меньше</div>
    <div v-else>это видно на разрешениях более 340</div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { Raw } from '@/@types/Raw';
import { LocationQuery, useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import TokenStorage from '@/TokenStorage';
import { Routes } from '@/router/routes';

const props = defineProps<{ query: LocationQuery }>();
const error: Ref<Raw | null> = ref(null);
const userStore = useUserStore();
const isLoading: Ref<boolean> = ref(false);
const router = useRouter();
import { useDisplay } from 'vuetify';
const { smAndDown } = useDisplay();

onMounted(() => {
  if (!props.query.code || TokenStorage.has()) {
    return;
  }
  isLoading.value = true;

  userStore
    .getAccessToken(String(props.query.code))
    .then(() => {
      userStore.getUser().then(() => router.push(Routes.RESOURCES));
    })
    .catch(({ response }: AxiosError) => {
      error.value = response ? (response.data as Raw) : null;
    })
    .finally(() => (isLoading.value = false));
});
</script>

<style lang="scss">
@import '~@/styles/colors';

.login {
  position: relative;
  left: 40vw;
  top: 45vh;
  width: 20vw;
  height: 10vh;
}

.login__btn {
  color: transparent;
}

.login__btn-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 10vh;
}

.login__btn-title {
  color: $black;
}
</style>
