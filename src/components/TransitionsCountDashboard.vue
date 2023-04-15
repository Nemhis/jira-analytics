<template>
  <div style="padding: 20px 50px">
    <bar-chart
      :chart-data="total"
      :options="{
        backgroundColor: $vuetify.theme.current.colors.primary,
        plugins: {
          title: {
            display: true,
            text: 'Количество переводов задач по статусам',
            color: $vuetify.theme.current.colors.secondary,
          },
        },
      }"
    />
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
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { BarChart } from 'vue-chart-3';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title);

const props = defineProps<{
  resourceId: string;
  issues: Issue[];
  loading: boolean;
}>();
const jiraStore = useJiraStore();
const counts = ref<TransitionCount[]>([]);
const total = computed(() => {
  const aggregated = serviceProvider.changelogService.aggregateTransitionsCount(counts.value);
  aggregated.sort((a: TransitionCount, b: TransitionCount): number => a.from - b.from);
  const getLabel = (counter: TransitionCount) => `${getStatusName(counter.from)} -> ${getStatusName(counter.to)}`;

  return {
    labels: aggregated.map(getLabel),
    datasets: [
      {
        data: aggregated.map(({ count }: TransitionCount) => count),
      },
    ],
  };
});

onMounted(() => {
  jiraStore.loadWorkflowStatuses(props.resourceId).then();
});

const loadChangelogs = () => {
  counts.value = [];

  if (props.issues.length === 0) {
    return;
  }

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
  (loading: boolean): void => {
    if (loading === false) {
      loadChangelogs();
    }
  },
  { immediate: true }
);
</script>
