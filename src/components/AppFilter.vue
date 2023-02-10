<template>
  <v-autocomplete
    :model-value="props.filter.projectId"
    @update:modelValue="handleProjectChange"
    :items="projects"
    :menu-props="{ maxHeight: 300, maxWidth: 300 }"
    item-title="name"
    item-value="id"
    label="Project"
    hide-details="auto"
    class="app-filter"
    outlined
    dense
    clearable
    :loading="isLoading"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :prepend-avatar="item.raw.avatarUrls.size16">
        <v-tooltip :text="item.raw.name" activator="parent" />
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import Project from '@/adapters/Project';
import { Ref, ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useJiraStore } from '@/store/jira';
import Filter from '@/adapters/Filter';
import _ from 'lodash';

const props = defineProps<{
  filter: Filter;
}>();
const emit = defineEmits(['submit']);
let draftFilter = _.cloneDeep(props.filter);
const route = useRoute();
const jiraStore = useJiraStore();
const resourceId = route.params.resourceId as string;
const projects: Ref<Project[]> = ref([]);
const isLoading: Ref<boolean> = ref(true);

const handleProjectChange = (id: number | null): void => {
  if (id === draftFilter.projectId) {
    return;
  }
  draftFilter.projectId = id;
  if (props.filter.projectId !== draftFilter.projectId) {
    emit('submit', draftFilter);
  }
};

watch(
  () => props.filter,
  () => {
    draftFilter = _.cloneDeep(props.filter);
  },
  { deep: true }
);

onMounted(() => {
  jiraStore
    .getProjects(resourceId)
    .then((loadProjects: Project[]) => {
      projects.value = loadProjects;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
<style>
.app-filter {
  position: relative;
  margin: 20px auto;
  max-width: 300px;
}
</style>
