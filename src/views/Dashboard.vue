<template>
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
import { Ref, ref, defineProps, onMounted } from 'vue';
import { useJiraStore } from '@/store/jira';
import Issue from '@/adapters/Issue';

const jiraStore = useJiraStore();
const issues: Ref<Issue[]> = ref([]);
const props = defineProps<{
  resourceId: string;
}>();

onMounted(() => {
  jiraStore.search(props.resourceId).then((loadedIssues: Issue[]) => {
    issues.value = loadedIssues;
  });
});
</script>

<style lang="scss">
.issues {
  width: 50vw;
  min-width: 300px;
  margin: 0 auto;
}
</style>