<template>
  <v-autocomplete
    v-model="project.name"
    :items="projects"
    :menu-props="{ maxHeight: 300, maxWidth: 300 }"
    item-title="name"
    label="Project"
    hide-details="auto"
    class="filter"
    clearable
    outlined
    dense
    @click:clear="removeQuery"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :prepend-avatar="item.raw.avatarUrls" @click="setQuery(item.raw.key)">
        <v-tooltip :text="item.raw.name" activator="parent" />
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
<script lang="ts" setup>
import Project from '@/adapters/Project';
import { Ref, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJiraStore } from '@/store/jira';

const route = useRoute();
const router = useRouter();
const jiraStore = useJiraStore();
const project: Ref<Project[]> = ref([]);
const resourceId = route.params.resourceId as string;
const projectKey = route.query.projectKey as string;
const projects: Ref<Project[]> = ref([]);

const removeQuery = (): void => {
  router.push({ query: {} });
};

const setQuery = (key: string): void => {
  router.push({ query: { projectKey: key } });
};

onMounted(() => {
  jiraStore.projects(resourceId).then((loadProjects: Project[]) => {
    projects.value = loadProjects;
  });

  if (projectKey) {
    jiraStore.project(resourceId, projectKey).then((loadProject: Project[]) => {
      project.value = loadProject;
    });
  }
});
</script>
<style>
.filter {
  position: relative;
  margin: 20px auto;
  max-width: 300px;
}
</style>
