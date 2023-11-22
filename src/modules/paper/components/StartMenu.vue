<template>
  <q-card
    bordered
    flat
    class="column absolute-left q-ma-xs rounded overflow-hidden"
    @mouseenter="openMenu(true)"
    @mouseleave="openMenu(false)"
  >
    <div
      class="q-pa-xs transition full-height"
      :style="{ width: open ? '240px' : '170px' }"
    >
      <q-scroll-area
        style="width: 100%; height: 100%"
        visible
        :thumb-style="thumbStyle"
      >
        <div class="column no-wrap absolute-full">
          <message-card
            v-for="(message, index) of messages"
            :key="index"
            :message="message"
            :open="open"
            @menu="(value) => (menu = value)"
          ></message-card>
        </div>
      </q-scroll-area>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePSStore } from '../stores/PSstore';

import { defaultMessage } from '../../scenarios/messages/stores/deafults';

import MessageCard from './sections/MessageCard.vue';

const store = usePSStore();

const open = ref(false);
const menu = ref(false);

const openMenu = (value: boolean) => {
  if (store.onconnection || store.dragging || store.onmessage || menu.value)
    return;

  open.value = value;
};

const hello = computed(() => store.feedback.hello ?? defaultMessage);
const startAdmin = computed(() => store.feedback.startAdmin ?? defaultMessage);
const cancel = computed(() => store.feedback.cancel ?? defaultMessage);

const messages = computed(() => [
  {
    label: 'Приветствие',
    data: hello.value,
    condition: store.feedback.hello !== null,
  },
  {
    label: 'Уведомление администратора',
    data: startAdmin.value,
    condition: store.feedback.startAdmin !== null,
  },
  {
    label: 'Сообщение при отмене',
    data: cancel.value,
    condition: store.feedback.cancel !== null,
  },
]);

const thumbStyle = {
  width: '8px',
  backgroundColor: 'var(--q-primary)',
  borderRadius: '10px',
  border: '4px solid rgba(0, 0, 0, 0)',
  // margin: '2px 20px',
};
</script>

<style scoped lang="scss"></style>
