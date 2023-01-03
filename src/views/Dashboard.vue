<template>
  <v-card v-if="issues.length" :disabled="issues.length === 0" class="mx-auto" max-width="300">
    <v-list density="compact">
      <v-list-subheader>Issues</v-list-subheader>

      <v-list-item v-for="issue in issues" :key="issue.id" :value="issue.id">
        <v-list-item-title v-text="issue.fields.summary" />
        <v-list-item-subtitle v-text="issue.key" />
      </v-list-item>
    </v-list>
  </v-card>
  <div v-if="isSelectedResource" class="selectedResourceBlock">
    <span>Select a resource</span>
    <v-btn to="/resources">to resources</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, onMounted, onBeforeMount } from 'vue';
import { useUserStore } from '@/store/user';
import { useJiraStore } from '@/store/jira';
import { useAtlassianStore } from '@/store/atlassian';

import { Raw } from '@/@types/Raw';
import { LocationQuery, useRoute, useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import AccessibleResource from '@/adapters/AccessibleResource';
import Issue from '@/adapters/Issue';
import { Routes } from '@/router/routes';

const props = defineProps<{ query: LocationQuery }>();
const error: Ref<Raw | null> = ref(null);
const userStore = useUserStore();
const jiraStore = useJiraStore();
const atlassianStore = useAtlassianStore();
const isLoading: Ref<boolean> = ref(false);
const token: Ref<string> = ref('');
const resources: Ref<AccessibleResource[]> = ref([]);
const issues: Ref<Issue[]> = ref([]);
const route = useRoute();
const isSelectedResource = ref(false);
const router = useRouter();

atlassianStore.$state.resourceId = String(route.params.resourceId);

if (route.fullPath === '/dashboard' || route.fullPath === '/dashboard/') {
  isSelectedResource.value = true;
}
onMounted(() => {
  const localToken = localStorage.getItem('token') || null;
  if (!localToken) {
    router.push(Routes.LOGIN);
  }

  if (localToken) {
    token.value = localToken;
    getAccessibleResource();
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

onBeforeMount(() => {
  const loadIssues = (): void => {
    jiraStore.search(atlassianStore.$state.resourceId).then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    });
  };
  loadIssues();
});
</script>

<style scoped>
.selectedResourceBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
}
</style>
