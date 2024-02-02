<template>
  <q-list>
    <q-item
      dense
      clickable
      v-ripple
      v-for="(button, index) of buttons"
      :key="index"
      v-show="button.condition"
      @click="button.action"
    >
      <q-item-section avatar>
        <q-icon :name="button.icon" :color="button.color" size="22px" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ button.label }}</q-item-label>
      </q-item-section>

      <q-inner-loading :showing="loading.delete" v-if="button.icon === 'close'">
        <q-spinner size="16px" color="primary" />
      </q-inner-loading>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';

import { mdiTransitConnectionHorizontal } from '@quasar/extras/mdi-v7';

const feedback = useFeedbackStore();

const loading = ref({
  delete: false,
  start: false,
  between: false,
  next: false,
});

const withoutCrossroad = computed(() => feedback.selectedMessage?.type !== 4);

const connectWith = () => {
  feedback.closeDialog('touch');
  feedback.menu.touch = false;
  feedback.mobile.connect = true;
};

const addMessage = () => {
  feedback.closeDialog('touch');
  feedback.menu.touch = false;
  feedback.openMenu('create', undefined, true);
};

const buttons = computed(() => [
  {
    label: 'Добавить новое сообщение',
    action: addMessage,
    icon: 'add',
    color: 'primary',
    condition: true,
  },
  {
    label: 'Соеденить с сообщением',
    action: connectWith,
    icon: mdiTransitConnectionHorizontal,
    color: 'positive',
    condition: withoutCrossroad,
  },
]);
</script>

<style scoped lang="scss"></style>
