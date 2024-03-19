<template>
  <q-card
    flat
    v-clickable
    class="rounded relative-position q-pa-sm overflow-hidden"
    @click="states.openDialog('timer_view')"
  >
    <div class="row items-center justify-center">
      <q-icon :name="mdiTimerOutline" color="primary" size="46px" />

      <div class="q-pl-sm text-primary">{{ formatted }}</div>
    </div>

    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Настройки таймера
    </q-tooltip>
  </q-card>
</template>

<script setup lang="ts">
import { defaultMessage } from 'src/utils/helpers/defaults';

import { useStatesStore } from '../../stores/states/statesStore';

import { mdiTimerOutline } from '@quasar/extras/mdi-v7';
import { computed } from 'vue';
import { getFormattedTime } from 'src/utils/helpers/time';

const props = withDefaults(defineProps<MessageTimerProps>(), {
  message: () => defaultMessage,
});

const states = useStatesStore();

const formatted = computed(() =>
  getFormattedTime(props.message.text, true, 'triple')
);

interface MessageTimerProps {
  message: MessageFree;
  dragging?: boolean;
  index?: number;
}
</script>

<style scoped lang="scss"></style>
