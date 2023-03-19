<template>
  <div class="app-filter">
    <v-autocomplete
      :model-value="props.filter.projectId"
      @update:modelValue="handleProjectChange"
      :items="projects"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      item-title="name"
      item-value="id"
      label="Project"
      hide-details="auto"
      class="app-filter__input"
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

    <v-autocomplete
      :model-value="props.filter.boardId"
      @update:modelValue="handleBoardChange"
      :items="boards"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      item-title="name"
      item-value="id"
      label="Board"
      hide-details="auto"
      class="app-filter__input"
      :disabled="boards.length < 1"
      outlined
      dense
      clearable
      :loading="isLoading"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.name" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.sprintIds"
      @update:modelValue="handleSprintChange"
      :items="sprints"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      item-title="name"
      item-value="id"
      label="Sprint"
      hide-details="auto"
      class="app-filter__input"
      :disabled="sprints.length < 1"
      outlined
      dense
      clearable
      multiple
      :loading="isLoading"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.name" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.issueIds"
      @update:modelValue="handleIssueChange"
      :items="issues"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      item-title="key"
      item-value="id"
      label="Issues"
      hide-details="auto"
      class="app-filter__input"
      :disabled="!draftFilter.projectId"
      outlined
      dense
      clearable
      multiple
      :loading="isLoading"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.fields.summary" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.implementerIds"
      @update:modelValue="handleUserChange"
      :items="users"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      item-title="displayName"
      item-value="accountId"
      label="Implementer"
      hide-details="auto"
      class="app-filter__input"
      :disabled="!draftFilter.projectId"
      outlined
      dense
      clearable
      multiple
      :loading="isLoading"
      @input="getUsers($event.srcElement.value)"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :prepend-avatar="item.raw.avatarUrls.size16">
          <v-tooltip :text="item.raw.displayName" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts" setup>
import Project from '@/adapters/Project';
import { Ref, ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useJiraStore } from '@/store/jira';
import Filter from '@/adapters/Filter';
import _, { toArray } from 'lodash';
import Issue from '@/adapters/Issue';
import User from '@/adapters/User';
import Sprint from '@/adapters/Sprint';
import Board from '@/adapters/Board';
import { AxiosError } from 'axios';
import { Raw } from '@/@types/Raw';

const props = defineProps<{
  filter: Filter;
  resourceId: string;
}>();

const emit = defineEmits(['submit']);
let draftFilter = _.cloneDeep(props.filter);
const route = useRoute();
const jiraStore = useJiraStore();
const resourceId = route.params.resourceId as string;
const projects: Ref<Project[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const users: Ref<User[]> = ref([]);
const sprints: Ref<Sprint[]> = ref([]);
const boards: Ref<Board[]> = ref([]);
const error: Ref<Raw | null> = ref(null);
const issues: Ref<Issue[]> = ref([]);

const getBoards = (): void => {
  jiraStore
    .getBoards(resourceId, draftFilter.projectId)
    .then((loadBoards: Board[]) => {
      boards.value = toArray(loadBoards['values']);
      isLoading.value = true;
    })
    .finally(() => (isLoading.value = false));
};

const getSprints = (): void => {
  jiraStore
    .getSprints(resourceId, draftFilter.boardId)
    .then((loadSprints: Sprint[]) => {
      sprints.value = toArray(loadSprints['values']);
      isLoading.value = true;
    })
    .catch(({ response }: AxiosError) => {
      error.value = response ? (response.data as Raw) : null;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const loadIssue = (search: Filter): void => {
  isLoading.value = true;
  jiraStore
    .search(props.resourceId, search)
    .then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
const getUsers = (userName: string): void => {
  jiraStore
    .getUsers(resourceId, userName)
    .then((loadUsers: User[]) => {
      users.value = loadUsers;
      isLoading.value = true;
    })
    .finally(() => (isLoading.value = false));
};

const handleProjectChange = (id: number | null): void => {
  if (id === draftFilter.projectId) {
    return;
  }

  draftFilter.projectId = id;
  draftFilter.boardId = null;
  draftFilter.sprintIds = null;
  draftFilter.issueIds = null;
  draftFilter.implementerIds = null;

  if (props.filter.projectId !== draftFilter.projectId) {
    emit('submit', draftFilter);
    if (draftFilter.projectId) {
      getBoards();
      loadIssue(draftFilter);
    }
  }
};

const handleBoardChange = (id: number | null): void => {
  if (id === draftFilter.boardId) {
    return;
  }

  draftFilter.boardId = id;
  if (props.filter.boardId !== draftFilter.boardId) {
    emit('submit', draftFilter);
    if (draftFilter.boardId) {
      getSprints();
      loadIssue(draftFilter);
    }
  }
};

const handleIssueChange = (id: number | null): void => {
  if (id === draftFilter.issueIds) {
    return;
  }

  draftFilter.issueIds = id;
  if (props.filter.issueIds !== draftFilter.issueIds) {
    emit('submit', draftFilter);
  }
};

const handleUserChange = (id: string | null): void => {
  if (id === draftFilter.implementerIds) {
    return;
  }
  draftFilter.implementerIds = id;
  if (props.filter.implementerIds !== draftFilter.implementerIds) {
    emit('submit', draftFilter);
    loadIssue(draftFilter);
  }
};

const handleSprintChange = (id: number | null): void => {
  if (id === draftFilter.sprintIds) {
    return;
  }

  draftFilter.sprintIds = id;
  if (props.filter.sprintIds !== draftFilter.sprintIds) {
    emit('submit', draftFilter);
    loadIssue(draftFilter);
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
      isLoading.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });

  if (draftFilter.projectId) {
    getBoards();
  }
  if (draftFilter.boardId) {
    getSprints();
  }
  loadIssue(draftFilter);
});
</script>
<style>
.app-filter {
  margin: 0 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.app-filter__input {
  box-sizing: border-box;
  min-width: 350px;
  padding: 10px;
  margin: 0 10px;
}
</style>
