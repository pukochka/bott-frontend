<template>
  <div
    class="col-6 col-sm-3"
    v-for="(button, index) of categoryButtons"
    :key="index"
  >
    <q-btn
      flat
      class="rounded fit"
      size="md"
      :color="button.color"
      :icon="button.icon"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        {{ button.tooltip }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { mdiAccountTie, mdiEyeOutline } from '@quasar/extras/mdi-v7';

const categoryButtons = [
  {
    tooltip: 'Просмотр менеджеров категории',
    icon: mdiAccountTie,
    action: '',
    color: 'grey',
    condition: '',
  },
  {
    tooltip: 'Просмотр лога категории',
    icon: mdiEyeOutline,
    action: '',
    color: 'orange',
    condition: '',
  },
  {
    tooltip: 'Редактирование категории',
    icon: 'edit',
    action: '',
    color: 'primary',
    condition: '',
  },
  {
    tooltip: 'Удалить категорию',
    icon: 'close',
    action: '',
    color: 'red',
    condition: '',
  },
];
</script>

<style lang="scss" scoped></style>
