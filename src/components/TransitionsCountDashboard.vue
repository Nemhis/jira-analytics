<template>
  <div style="padding: 20px 50px">
    <v-autocomplete
      v-model="fromStatus"
      :items="statuses"
      :loading="statusesLoading"
      item-title="name"
      item-value="id"
      label="From status"
      hide-details="auto"
      outlined
      dense
      clearable
      multiple
    />

    <bar-chart
      :chart-data="total"
      :options="{
        backgroundColor: $vuetify.theme.current.colors.primary,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { TransitionCount } from '@/interfaces/TransitionCount';
import { serviceProvider } from '@/plugins/services';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { computed, onMounted, ref, watch } from 'vue';
import { BarChart } from 'vue-chart-3';
import { useTheme } from 'vuetify';
import Changelog from '@/adapters/Changelog';
import Issue from '@/adapters/Issue';
import PaginatedList from '@/adapters/PaginatedList';
import WorkflowStatus from '@/adapters/WorkflowStatus';
import { useJiraStore } from '@/store/jira';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

const props = defineProps<{
  resourceId: string;
  issues: Issue[];
  loading: boolean;
  projectId?: number | null;
}>();
const jiraStore = useJiraStore();
const theme = useTheme();
const counts = ref<TransitionCount[]>([]);

const statusesLoading = ref<boolean>(false);
const statuses = ref<WorkflowStatus[]>([]);
const fromStatus = ref<WorkflowStatus | null>(null);

const total = computed(() => {
  const aggregated = serviceProvider.changelog.aggregateTransitionsCount(counts.value);
  aggregated.sort((a: TransitionCount, b: TransitionCount): number => a.from - b.from);
  const getLabel = (counter: TransitionCount) => `${getStatusName(counter.from)} -> ${getStatusName(counter.to)}`;

  return {
    labels: aggregated.map(getLabel),
    datasets: [
      {
        data: aggregated.map(({ count }: TransitionCount) => count),
        datalabels: {
          color: theme.current.value.colors.background,
        },
      },
    ],
  };
});

onMounted(() => {
  statusesLoading.value = true;

  jiraStore
    .searchStatusesPaginated()
    .then((workflowStatuses: WorkflowStatus[]) => {
      statuses.value = props.projectId
        ? serviceProvider.status.filterByProject(props.projectId, workflowStatuses)
        : workflowStatuses;
    })
    .finally(() => (statusesLoading.value = false));
});

const loadChangelogs = () => {
  counts.value = [];

  if (props.issues.length === 0) {
    return;
  }

  props.issues.forEach((issue: Issue) => {
    jiraStore.loadChangelog(issue.key).then((list: PaginatedList<Changelog>) => {
      const loadedCounts: TransitionCount[] = serviceProvider.changelog.calcTransitionsCount(list.values);

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
  { immediate: true },
);

watch(
  () => props.projectId,
  (projectId?: number | null): void => {
    jiraStore.searchStatusesPaginated().then((workflowStatuses: WorkflowStatus[]) => {
      statuses.value = projectId
        ? serviceProvider.status.filterByProject(projectId, workflowStatuses)
        : workflowStatuses;
    });
  },
  { immediate: true },
);
</script>
