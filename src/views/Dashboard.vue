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
</template>

<script lang="ts" setup>
import { Ref, ref, onBeforeMount } from 'vue';
import { useJiraStore } from '@/store/jira';
import { useRoute } from 'vue-router';
import Issue from '@/adapters/Issue';

const jiraStore = useJiraStore();
const route = useRoute();
const resourcesId = ref(String(route.params.resourceId));
const issues: Ref<Issue[]> = ref([]);

const loadIssues = (): void => {
  jiraStore.search(resourcesId.value).then((loadedIssues: Issue[]) => {
    issues.value = loadedIssues;
  });
};

onBeforeMount(() => {
  loadIssues();
});
</script>

<style lang="scss"></style>
