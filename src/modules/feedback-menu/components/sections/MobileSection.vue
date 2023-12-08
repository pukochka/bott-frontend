<template>
  <div class="absolute-top">
    <q-card flat bordered class="row">
      <q-btn
        square
        flat
        no-caps
        stack
        size="md"
        color="primary"
        class="col"
        :icon="button.icon"
        v-for="(button, index) of buttons"
        :key="index"
        @click="button.action"
      >
        <div class="text-caption text-weight-bold">{{ button.label }}</div>
      </q-btn>
    </q-card>

    <warning-start></warning-start>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  mdiFlagCheckered,
  mdiFlag,
  mdiViewDashboardEditOutline,
} from '@quasar/extras/mdi-v7';
import { useFeedbackStore } from '../../stores/feedbackStore';
import WarningStart from '../views/WarningStart.vue';

const store = useFeedbackStore();

const openSection = (section: SectionKeys) => {
  Object.keys(store.mobile)
    .filter((key) => key !== section)
    .forEach((key) => (store.mobile[<SectionKeys>key] = false));

  store.mobile[section] = !store.mobile[section];
};

const buttons = computed(() => [
  {
    icon: mdiFlag,
    action: () => openSection('start'),
    label: 'Старт',
  },
  {
    icon: mdiViewDashboardEditOutline,
    action: () => openSection('setting'),
    label: 'Настройки',
  },
  {
    icon: mdiFlagCheckered,
    action: () => openSection('end'),
    label: 'Конец',
  },
]);

type SectionKeys = 'start' | 'end' | 'setting';
</script>

<style scoped lang="scss"></style>
