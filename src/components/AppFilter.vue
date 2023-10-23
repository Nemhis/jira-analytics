<template>
  <div class="app-filter">
    <v-autocomplete
      :model-value="props.filter.projectId"
      :items="projects"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      :loading="isLoading"
      @update:model-value="handleProjectChange"
      item-title="name"
      item-value="id"
      label="Project"
      hide-details="auto"
      class="app-filter__input"
      variant="outlined"
      clearable
      dense
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :prepend-avatar="item.raw.avatarUrls.size16">
          <v-tooltip :text="item.raw.name" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.boardId"
      :items="boards"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      :disabled="boards.length < 1"
      :loading="isLoading"
      @update:model-value="handleBoardChange"
      item-title="name"
      item-value="id"
      label="Board"
      hide-details="auto"
      class="app-filter__input"
      variant="outlined"
      clearable
      dense
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.name" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.sprintIds"
      :items="sprints"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      :disabled="sprints.length < 1"
      :loading="isLoading"
      @update:model-value="handleSprintChange"
      item-title="name"
      item-value="id"
      label="Sprint"
      hide-details="auto"
      class="app-filter__input"
      variant="outlined"
      clearable
      multiple
      dense
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.name" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.issueIds"
      :items="issues"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      :disabled="!draftFilter.projectId"
      :loading="isLoading"
      @update:model-value="handleIssueChange"
      item-title="key"
      item-value="id"
      label="Issues"
      hide-details="auto"
      class="app-filter__input"
      variant="outlined"
      clearable
      multiple
      dense
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <v-tooltip :text="item.raw.fields.summary" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>

    <v-autocomplete
      :model-value="props.filter.implementerIds"
      :items="users"
      :menu-props="{ maxHeight: 300, maxWidth: 300 }"
      :disabled="!draftFilter.projectId"
      :loading="isLoading"
      @update:model-value="handleUserChange"
      @input="getUsers($event.srcElement.value)"
      item-title="displayName"
      item-value="accountId"
      label="Implementer"
      hide-details="auto"
      class="app-filter__input"
      variant="outlined"
      clearable
      multiple
      dense
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :prepend-avatar="item.raw.avatarUrls.size16">
          <v-tooltip :text="item.raw.displayName" activator="parent" />
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts" setup>
import { AxiosError } from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';
import toArray from 'lodash-es/toArray';
import { Ref, ref, onMounted, watch } from 'vue';
import { Raw } from '@/@interfaces/Raw';
import Board from '@/adapters/Board';
import Filter from '@/adapters/Filter';
import Issue from '@/adapters/Issue';
import Project from '@/adapters/Project';
import Sprint from '@/adapters/Sprint';
import User from '@/adapters/User';
import { useJiraStore } from '@/store/jira';

const props = defineProps<{
  filter: Filter;
}>();

const emit = defineEmits(['submit']);
let draftFilter = cloneDeep(props.filter);
const jiraStore = useJiraStore();
const projects: Ref<Project[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);
const users: Ref<User[]> = ref([]);
const sprints: Ref<Sprint[]> = ref([]);
const boards: Ref<Board[]> = ref([]);
const error: Ref<Raw | null> = ref(null);
const issues: Ref<Issue[]> = ref([]);

const getBoards = (): void => {
  jiraStore
    .getBoards(draftFilter.projectId)
    .then((loadBoards: Board[]) => {
      boards.value = toArray(loadBoards['values']);
      isLoading.value = true;
    })
    .finally(() => (isLoading.value = false));
};

const getSprints = (): void => {
  isLoading.value = true;

  jiraStore
    .getSprints(draftFilter.boardId)
    .then((loadedSprints: Sprint[]) => {
      sprints.value = loadedSprints.sort((a: Sprint, b: Sprint) => {
        if (a.endDate && b.endDate) {
          return b.endDate.valueOf() - a.endDate.valueOf();
        } else if (a.endDate) {
          return -1;
        } else if (b.endDate) {
          return 1;
        } else {
          return 0;
        }
      });
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
    .search(search)
    .then((loadedIssues: Issue[]) => {
      issues.value = loadedIssues;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
const getUsers = (userName: string): void => {
  jiraStore
    .getUsers(userName)
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
  boards.value = [];
  sprints.value = [];
  issues.value = [];

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

const handleIssueChange = (id: Array<number> | null): void => {
  if (id === draftFilter.issueIds) {
    return;
  }

  draftFilter.issueIds = id;
  if (props.filter.issueIds !== draftFilter.issueIds) {
    emit('submit', draftFilter);
  }
};

const handleUserChange = (id: Array<string> | null): void => {
  if (id === draftFilter.implementerIds) {
    return;
  }
  draftFilter.implementerIds = id;
  if (props.filter.implementerIds !== draftFilter.implementerIds) {
    emit('submit', draftFilter);
    loadIssue(draftFilter);
  }
};

const handleSprintChange = (id: Array<number> | null): void => {
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
    draftFilter = cloneDeep(props.filter);
  },
  { deep: true },
);

onMounted(() => {
  jiraStore
    .getProjects()
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
  getUsers('');
});
</script>
<style lang="scss">
.app-filter {
  margin: 0 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 12px;
}

.app-filter__input {
  box-sizing: border-box;
  min-width: 350px;
}
</style>
