<template>
  <q-card
    bordered
    flat
    square
    class="column absolute-right overflow-hidden"
    @mouseenter="openMenu(true)"
    @mouseleave="openMenu(false)"
  >
    <div
      class="q-pa-xs transition full-height"
      :style="{ width: open || sm ? '240px' : '170px' }"
    >
      <div
        class="column no-wrap absolute-full q-pa-xs"
        :style="{ paddingTop: sm ? '60px' : '' }"
      >
        <message-card
          v-for="(message, index) of messages"
          :key="index"
          :message="message"
          :open="open"
          @menu="(value) => (menu = value)"
        ></message-card>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { useQuasar } from 'quasar';

import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import MessageCard from '../views/MessageCard.vue';

const store = useFeedbackStore();
const quasar = useQuasar();

const open = ref(false);
const menu = ref(false);

const sm = computed(() => quasar.screen.lt.sm);

const openMenu = (value: boolean) => {
  if (store.onconnection || store.dragging || menu.value) return;

  open.value = value;
};

const end = computed(() => store.feedback.end ?? defaultMessage);
const admin = computed(() => store.feedback.admin ?? defaultMessage);
const answerAdmin = computed(
  () => store.feedback.answerAdmin ?? defaultMessage
);

const messages = computed((): any => [
  {
    label: 'Прощание',
    data: end.value,
    condition: store.feedback.end !== null,
    desc: 'Сообщения после окончания прохождения формы.',
    method: 'end',
  },
  {
    label: 'Уведомление администратора',
    data: admin.value,
    condition: store.feedback.admin !== null,
    desc: 'После того как пользователь ответил на вопросы, администратор получит уведомление.',
    method: 'admin',
  },
  {
    label: 'Быстрые ответы для администратора',
    data: answerAdmin.value,
    condition: store.feedback.answerAdmin !== null,
    desc: 'После того как пользователь ответил на вопросы, администратору будет предложено обработать заявку.',
    method: 'answer',
  },
]);
</script>

<style scoped lang="scss"></style>
