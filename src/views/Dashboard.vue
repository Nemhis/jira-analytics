<template>
  <app-filter :filter="filter" @submit="handleFilterChange" class="dashboard" />
  <v-card v-if="issues.length && !isLoading" :disabled="issues.length === 0" class="dashboard__issues">
    <v-list density="compact">
      <v-list-subheader>Issues</v-list-subheader>
      <v-list-item v-for="issue in issues" :key="issue.id" :value="issue.id">
        <v-list-item-title v-text="issue.fields.summary" />
        <v-list-item-subtitle v-text="issue.key" />

        <v-list-item-action>
          <v-btn @click.stop="loadTransitions(issue)">Load transitions</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
  <v-progress-circular v-if="isLoading" class="dashboard__issues-loading" indeterminate />
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, toRefs, onMounted } from 'vue';
import { useJiraStore } from '@/store/jira';
import Issue from '@/adapters/Issue';
import { useRoute, useRouter } from 'vue-router';
import Filter from '@/adapters/Filter';
import AppFilter from '@/components/AppFilter.vue';

const props = defineProps<{
  resourceId: string;
}>();

const router = useRouter();
const route = toRefs(useRoute());
const jiraStore = useJiraStore();
const issues: Ref<Issue[]> = ref([]);
let filter: Ref<Filter> = ref(new Filter(route.query.value));
const isLoading: Ref<boolean> = ref(false);

const handleFilterChange = (changedFilter: Filter): void => {
  filter.value = changedFilter;
  router.push({ query: { ...Filter.toRaw(filter.value) } }).then(() => {
    loadIssue(filter.value);
  });
};

const loadIssue = (search: Filter): void => {
  isLoading.value = true;
  jiraStore
    .search(props.resourceId, search)
    .then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const loadTransitions = (issue: Issue): void => {
  jiraStore.loadChangelog(props.resourceId, issue.key).then((changelog) => {
    console.log(changelog);
  });
};

onMounted(() => {
  loadIssue(filter.value);
});
</script>

<style lang="scss">
.dashboard__issues {
  width: 50vw;
  min-width: 300px;
  margin: 100px auto;
}

.dashboard__issues-loading {
  position: relative;
  height: 100px;
  width: 100px;
  margin: 100px calc(50% - 50px);
}
</style>
