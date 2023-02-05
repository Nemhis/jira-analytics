<template>
  <project-filter v-model:filter="filter" @submit="handleFilterChange" />
  <v-card v-if="issues.length" :disabled="issues.length === 0" class="issues">
    <v-list density="compact">
      <v-list-subheader>Issues</v-list-subheader>
      <v-list-item v-for="issue in issues" :key="issue.id" :value="issue.id">
        <v-list-item-title v-text="issue.fields.summary" />
        <v-list-item-subtitle v-text="issue.key" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { Ref, ref, defineProps, toRefs } from 'vue';
import { useJiraStore } from '@/store/jira';
import Issue from '@/adapters/Issue';
import { useRoute, useRouter } from 'vue-router';
import FilterProject from '@/adapters/FilterProject';
import ProjectFilter from '@/components/FilterProject.vue';
import { Raw } from '@/@types/Raw';

const props = defineProps<{
  resourceId: string;
}>();

const router = useRouter();
const route = toRefs(useRoute());
const jiraStore = useJiraStore();
const issues: Ref<Issue[]> = ref([]);
let filter: FilterProject = new FilterProject(route.query.value);

const handleFilterChange = (changedFilter: FilterProject): void => {
  filter = changedFilter;
  router.push({ query: { ...filter } }).then(() => {
    if (filter.id) {
      const searchProject = { project: `jql=project=${route.query.value.id}` };
      loadIssue(searchProject);
    }
  });
};

const loadIssue = (search: Raw): void => {
  jiraStore.search(props.resourceId, search.project).then((loadedIssues: Issue[]) => {
    issues.value = loadedIssues;
  });
};
</script>

<style lang="scss">
.issues {
  width: 50vw;
  min-width: 300px;
  margin: 100px auto;
}
</style>
