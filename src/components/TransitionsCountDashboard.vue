<template>
  <div v-for="counter in total" :key="`${counter.from}-${counter.to}`">
    {{ getStatusName(counter.from) }} -> {{ getStatusName(counter.to) }} <br />
    count: {{ counter.count }} <br />
  </div>
</template>

<script lang="ts" setup>
import Issue from '@/adapters/Issue';
import PaginatedList from '@/adapters/PaginatedList';
import Changelog from '@/adapters/Changelog';
import { TransitionCount } from '@/interfaces/TransitionCount';
import { serviceProvider } from '@/plugins/services';
import { useJiraStore } from '@/store/jira';
import { computed, defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  resourceId: string;
  issues: Issue[];
  loading: boolean;
}>();
const jiraStore = useJiraStore();
const counts = ref<TransitionCount[]>([]);
const total = computed(() => serviceProvider.changelogService.aggregateTransitionsCount(counts.value));

onMounted(() => {
  jiraStore.loadWorkflowStatuses(props.resourceId).then();
});

const loadChangelogs = () => {
  props.issues.forEach((issue: Issue) => {
    jiraStore.loadChangelog(props.resourceId, issue.key).then((list: PaginatedList<Changelog>) => {
      const loadedCounts: TransitionCount[] = serviceProvider.changelogService.calcTransitionsCount(list.values);

      if (loadedCounts.length) {
        counts.value = [...counts.value, ...loadedCounts];
      }
    });
  });
};

const getStatusName = (id: number): string => {
  return jiraStore.$state.workflowStatuses[id] ? jiraStore.$state.workflowStatuses[id].name : '';
};

watch(
  () => props.loading,
  (): void => {
    loadChangelogs();
  },
  { immediate: true }
);
</script>
