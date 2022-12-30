<template>
  <v-card v-if="resources.length" :disabled="resources.length === 0" class="center" max-width="300">
    <v-list density="compact">
      <v-list-subheader>Resources</v-list-subheader>
      <v-list-item
        v-for="resource in resources"
        :key="resource.id"
        :value="resource.id"
        @click="setSelectResource(resource.id)"
        active-color="primary"
        ref="input"
        :to="`/dashboard/${resource.id}`"
      >
        <template v-slot:prepend>
          <v-avatar :image="resource.avatarUrl" />
        </template>

        <v-list-item-title v-text="resource.name" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { Raw } from '@/@types/Raw';
import { LocationQuery } from 'vue-router';
import { AxiosError } from 'axios';
import { useAtlassianStore } from '@/store/atlassian';
import AccessibleResource from '@/adapters/AccessibleResource';
import { VUE_APP_DOMAIN } from '@/config';

const props = defineProps<{ query: LocationQuery }>();

const error: Ref<Raw | null> = ref(null);
const userStore = useUserStore();
const atlassianStore = useAtlassianStore();
const isLoading: Ref<boolean> = ref(false);
const token: Ref<string> = ref('');
const resources: Ref<AccessibleResource[]> = ref([]);
onMounted(() => {
  const localToken = localStorage.getItem('token') || null;

  if (localToken) {
    token.value = localToken;
    getAccessibleResource();
  }
  if (!localToken) {
    window.location.href = VUE_APP_DOMAIN + '/login';
  }

  if (!props.query.code || localToken) {
    return;
  }

  isLoading.value = true;

  userStore
    .getAccessToken(String(props.query.code))
    .then((accessToken: string) => {
      token.value = accessToken;
      localStorage.setItem('token', accessToken);
      window.location.reload();

      getAccessibleResource();
    })
    .catch(({ response }: AxiosError) => {
      error.value = response ? (response.data as Raw) : null;
    })
    .finally(() => (isLoading.value = false));
});

const getAccessibleResource = (): void => {
  atlassianStore.getAccessibleResources().then((accessibleResources: AccessibleResource[]) => {
    resources.value = accessibleResources;
  });
};

const setSelectResource = (resourceId: string): string => {
  return (atlassianStore.$state.resource = resourceId);
};
</script>

<style scoped>
.center {
  top: 200px;
  left: 40%;
}
</style>
