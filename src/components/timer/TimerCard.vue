<template>
  <q-card
    flat
    v-clickable
    class="rounded relative-position q-pa-sm overflow-hidden"
    @click="handleClick"
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

  <timer-view-modal
    :message="message"
    v-model="viewModal"
    @hide="viewModal = false"
    @update-time="updateTime"
  ></timer-view-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { defaultMessage } from 'src/utils/helpers/defaults';
import { getFormattedTime } from 'src/utils/helpers/time';

import TimerViewModal from './TimerViewModal.vue';

import { mdiTimerOutline } from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<TimerCardProps>(), {
  message: () => defaultMessage,
  scenarios: false,
});

const emit = defineEmits<{
  (e: 'update-time', time: number, callback?: () => void): void;
  (e: 'open-inline-menu'): void;
}>();

const updateTime = (value: number, callback?: () => void) => {
  emit('update-time', value, callback);
};

const viewModal = ref(false);

const formatted = computed(() =>
  getFormattedTime(props.message.text, true, 'triple')
);

const handleClick = () => {
  if (props.scenarios) {
    emit('open-inline-menu');
    return;
  }

  viewModal.value = true;
};

interface TimerCardProps {
  message: MessageFree;
  scenarios: boolean;
}
</script>

<style scoped lang="scss"></style>
