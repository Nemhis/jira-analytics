<template>
  <v-card v-if="resources.length" :disabled="resources.length === 0" class="resources" max-width="300">
    <v-list density="compact">
      <v-list-subheader>Resources</v-list-subheader>
      <v-list-item
        v-for="resource in resources"
        :key="resource.id"
        :value="resource.id"
        active-color="primary"
        ref="input"
        :to="{ ...Routes.DASHBOARD, params: { resourceId: resource.id } }"
      >
        <template v-slot:prepend>
          <v-avatar :image="resource.avatarUrl" />
        </template>
        <v-list-item-title v-text="resource.name" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue';
import { useAtlassianStore } from '@/store/atlassian';
import AccessibleResource from '@/adapters/AccessibleResource';
import { Routes } from '@/router/routes';

const atlassianStore = useAtlassianStore();
const resources: Ref<AccessibleResource[]> = ref([]);
const getAccessibleResource = (): void => {
  atlassianStore.getAccessibleResources().then((accessibleResources: AccessibleResource[]) => {
    resources.value = accessibleResources;
  });
};

onMounted(() => {
  getAccessibleResource();
});
</script>

<style lang="scss">
.resources {
  margin-top: 20%;
  left: 40%;
}
</style>
