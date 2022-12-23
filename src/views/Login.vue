<template>
  <div class="login">
    <v-btn :href="$utils.url.buildAuthUrl().toString()">Login via Atlassian</v-btn>
    <br />

    <br />
    <p v-if="error"><b>ошибка:</b> {{ error || '-' }}</p>
    <p><b>token:</b> {{ token ? `${token.slice(0, 5)}...` : '-' }}</p>
    <v-progress-circular v-if="isLoading" />

    <v-card v-if="resources.length" :disabled="resources.length === 0" class="mx-auto" max-width="300">
      <v-list density="compact">
        <v-list-subheader>Resources</v-list-subheader>

        <v-list-item
          v-for="resource in resources"
          :key="resource.id"
          :value="resource.id"
          @click="loadIssues(resource.id)"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-avatar :image="resource.avatarUrl" />
          </template>

          <v-list-item-title v-text="resource.name" />
        </v-list-item>
      </v-list>
    </v-card>

    <br />
    <v-card v-if="issues.length" :disabled="issues.length === 0" class="mx-auto" max-width="300">
      <v-list density="compact">
        <v-list-subheader>Issues</v-list-subheader>

        <v-list-item v-for="issue in issues" :key="issue.id" :value="issue.id">
          <v-list-item-title v-text="issue.fields.summary" />
          <v-list-item-subtitle v-text="issue.key" />
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { Raw } from '@/@types/Raw';
import { LocationQuery } from 'vue-router';
import { useJiraStore } from '@/store/jira';
import { AxiosError } from 'axios';
import { useAtlassianStore } from '@/store/atlassian';
import AccessibleResource from '@/adapters/AccessibleResource';
import Issue from '@/adapters/Issue';

const props = defineProps<{ query: LocationQuery }>();

const error: Ref<Raw | null> = ref(null);
const userStore = useUserStore();
const jiraStore = useJiraStore();
const atlassianStore = useAtlassianStore();
const isLoading: Ref<boolean> = ref(false);
const token: Ref<string> = ref('');
const resources: Ref<AccessibleResource[]> = ref([]);
const issues: Ref<Issue[]> = ref([]);

onMounted(() => {
  const localToken = localStorage.getItem('token') || null;

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

const loadIssues = (resourceId: string): void => {
  jiraStore.search(resourceId).then((loadedIssues: Issue[]) => {
    issues.value = loadedIssues;
  });
};
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
