<template>
  <v-autocomplete
    :model-value="draftFilter.id"
    @update:modelValue="handleProjectChange"
    :items="projects"
    :menu-props="{ maxHeight: 300, maxWidth: 300 }"
    item-title="name"
    item-value="id"
    label="Project"
    hide-details="auto"
    class="filter-project"
    clearable
    outlined
    dense
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
import { Ref, ref, onMounted, defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
import { useJiraStore } from '@/store/jira';
import FilterProject from '@/adapters/FilterProject';
import _ from 'lodash';

const props = defineProps<{
  filter: FilterProject;
}>();
const emit = defineEmits(['submit']);

let draftFilter = ref(_.cloneDeep(props.filter));
const route = useRoute();
const jiraStore = useJiraStore();
const resourceId = route.params.resourceId as string;
const projects: Ref<Project[]> = ref([]);

const handleProjectChange = (id: number | null): void => {
  draftFilter.value.id = id ? id : undefined;
  emit('submit', draftFilter.value);
};
onMounted(() => {
  jiraStore.getProjects(resourceId).then((loadProjects: Project[]) => {
    projects.value = loadProjects;
  });
});
</script>
<style>
.filter-project {
  position: relative;
  margin: 20px auto;
  max-width: 300px;
}
</style>
