<template>
  <v-card v-if="resources.length" :disabled="resources.length === 0" max-width="300" class="resources">
    <v-list class="resources__item">
      <v-list-subheader>Resources</v-list-subheader>
      <v-list-item
        v-for="resource in resources"
        :key="resource.id"
        :value="resource.id"
        :to="{ ...Routes.DASHBOARD, params: { resourceId: resource.id } }"
        active-color="primary"
        ref="input"
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  width: 20vw;
  min-width: 300px;
  top: 40vh;
}

.resources__item {
  width: 100%;
}
</style>
