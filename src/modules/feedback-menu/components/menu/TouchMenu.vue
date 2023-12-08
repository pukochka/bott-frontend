<template>
  <q-dialog v-model="store.dialogs.touch" @before-hide="updateHide">
    <q-card bordered flat class="rounded">
      <component :is="menu[opened]"></component>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';

import CreateMenu from './CreateMenu.vue';
import MessageMenu from './MessageMenu.vue';
import LinkMenu from './LinkMenu.vue';

const store = useFeedbackStore();

const opened = computed(
  () =>
    Object.entries(store.menu)
      .filter(([_, value]) => value)
      .map(([key]) => key)?.[0] ?? 'create'
);

const menu = computed(() => ({
  create: CreateMenu,
  message: MessageMenu,
  link: LinkMenu,
}));

const updateHide = () => {
  store.hideMenu();

  if (store.action !== null) store.action();
};
</script>

<style scoped lang="scss"></style>
