<template>
  <v-card
    v-if="resources.length"
    :disabled="resources.length === 0"
    max-width="300"
    location="center"
    class="resources"
  >
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

onMounted(() => {
  atlassianStore.getAccessibleResources().then((accessibleResources: AccessibleResource[]) => {
    resources.value = accessibleResources;
  });
});
</script>

<style lang="scss">
.resources {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 10vw;
}
</style>
