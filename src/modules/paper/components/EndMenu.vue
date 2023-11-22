<template>
  <q-card
    bordered
    flat
    class="column absolute-right q-ma-xs rounded overflow-hidden"
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
import { usePSStore } from '../stores/PSstore';
import { computed, ref } from 'vue';
import { defaultMessage } from '../../scenarios/messages/stores/deafults';
import MessageCard from './sections/MessageCard.vue';

const store = usePSStore();

const open = ref(false);
const menu = ref(false);

const add = () => {
  console.log(
    store.feedback.inputs.map((item) => {
      return { x: item.platform.position.x, y: item.platform.position.y };
    })
  );
};

const openMenu = (value: boolean) => {
  if (store.onconnection || store.dragging || store.onmessage || menu.value)
    return;

  open.value = value;
};

const end = computed(() => store.feedback.end ?? defaultMessage);
const admin = computed(() => store.feedback.admin ?? defaultMessage);
const answerAdmin = computed(
  () => store.feedback.answerAdmin ?? defaultMessage
);

const messages = computed(() => [
  {
    label: 'Прощание',
    data: end.value,
    condition: store.feedback.end !== null,
  },
  {
    label: 'Уведомление администратора',
    data: admin.value,
    condition: store.feedback.admin !== null,
  },
  {
    label: 'Быстрые ответы для администратора',
    data: answerAdmin.value,
    condition: store.feedback.answerAdmin !== null,
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
