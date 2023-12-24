<template>
  <q-card flat square class="absolute-top card-border__bottom">
    <div class="row justify-between relative-position">
      <div class="row">
        <q-btn
          flat
          square
          v-for="(button, index) of actions"
          :key="index"
          :color="button.color"
          :icon="button.icon"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="bottom middle"
            self="top middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="text-h6 text-weight-bold absolute-center">Чат</div>

      <q-btn
        padding="8px 22px"
        square
        flat
        size="md"
        color="primary"
        icon="close"
        @click="work.chat = false"
      />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../../stores/workStore';
import { computed } from 'vue';
import {
  mdiBriefcase,
  mdiBriefcaseArrowUpDown,
  mdiTagCheck,
  mdiTagRemove,
  mdiTransfer,
  mdiCog,
} from '@quasar/extras/mdi-v7';

const work = useWorkStore();

const actions = computed(() => [
  {
    label: 'Взять в работу тикет',
    action: '',
    icon: mdiBriefcase,
    color: 'positive',
  },
  {
    label: 'Передать другому исполнителю',
    action: '',
    icon: mdiBriefcaseArrowUpDown,
    color: 'info',
  },
  {
    label: 'Переместить тикет в другую категорию',
    action: '',
    icon: mdiTransfer,
    color: 'secondary',
  },
  {
    label: 'Предложить закрыть тикет',
    action: '',
    icon: mdiTagCheck,
    color: 'warning',
  },
  {
    label: 'Редактровать настройки тикета',
    action: '',
    icon: mdiCog,
    color: 'primary',
  },
  {
    label: 'Удалить тикет',
    action: '',
    icon: mdiTagRemove,
    color: 'negative',
  },
]);
</script>

<style scoped lang="scss"></style>
