<template>
  <app-filters />
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
import { Ref, ref, defineProps, onMounted, toRefs, watch } from 'vue';
import { useJiraStore } from '@/store/jira';
import Issue from '@/adapters/Issue';
import AppFilters from '@/components/AppFilters.vue';
import { useRoute } from 'vue-router';

const route = toRefs(useRoute());
const jiraStore = useJiraStore();
const issues: Ref<Issue[]> = ref([]);
const projectKey = ref(route.query.value.projectKey as string);
const props = defineProps<{
  resourceId: string;
}>();

const loadIssue = (): void => {
  if (projectKey.value) {
    jiraStore.search(props.resourceId, projectKey.value).then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    });
  }
};
onMounted(() => {
  loadIssue();
});

watch(route.query, () => {
  projectKey.value = route.query.value.projectKey as string;
  loadIssue();
});
</script>

<style lang="scss">
.issues {
  width: 50vw;
  min-width: 300px;
  margin: 100px auto;
}
</style>
