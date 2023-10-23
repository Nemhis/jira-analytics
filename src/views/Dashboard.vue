<template>
  <div class="dashboard">
    <app-filter :filter="filter" :resource-id="resourceId" @submit="handleFilterChange" class="dashboard__filter" />

    <transitions-count-dashboard
      :loading="isLoading"
      :issues="issues"
      :resource-id="props.resourceId"
      :project-id="filter.projectId"
    />

    <v-card v-if="issues.length && !isLoading" :disabled="issues.length === 0" class="dashboard__issues">
      <v-list density="compact">
        <v-list-subheader>Issues: {{ issues.length }}</v-list-subheader>
        <v-list-item v-for="issue in issues" :key="issue.id" :value="issue.id">
          <v-list-item-title>{{ issue.fields.summary }}</v-list-item-title>
          <v-list-item-subtitle>{{ issue.key }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
    <v-progress-circular v-if="isLoading" class="dashboard__issues-loading" indeterminate />
  </div>
</template>

<script lang="ts" setup>
import api from '@/api';
import { Ref, ref, toRefs, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Filter from '@/adapters/Filter';
import Issue from '@/adapters/Issue';
import { useJiraStore } from '@/store/jira';
import AppFilter from '@/components/AppFilter.vue';
import TransitionsCountDashboard from '@/components/TransitionsCountDashboard.vue';

const props = defineProps<{
  resourceId: string;
}>();

const router = useRouter();
const route = toRefs(useRoute());
const jiraStore = useJiraStore();
const issues: Ref<Issue[]> = ref([]);
const filter: Ref<Filter> = ref(new Filter(route.query.value));
const isLoading: Ref<boolean> = ref(false);

onBeforeMount(() => {
  api.jira.setResource(props.resourceId);
});

const handleFilterChange = (changedFilter: Filter): void => {
  filter.value = changedFilter;
  router.push({ query: { ...Filter.toRaw(filter.value) } }).then(() => {
    loadIssue(filter.value);
  });
};

const loadIssue = (search: Filter): void => {
  isLoading.value = true;
  jiraStore
    .search(search)
    .then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  loadIssue(filter.value);
});
</script>

<style lang="scss">
.dashboard {
  padding-top: 24px;
}

.dashboard__issues {
  width: 50vw;
  min-width: 300px;
  margin: 50px auto;
}

.dashboard__issues-loading {
  position: relative;
  height: 100px;
  width: 100px;
  margin: 100px calc(50% - 50px);
}

.dashboard__filter {
  margin-bottom: 12px;
}
</style>
