<template>
  <q-card
    bordered
    flat
    square
    class="column absolute-left overflow-hidden"
    @mouseenter="openMenu(true)"
    @mouseleave="openMenu(false)"
  >
    <div
      class="transition full-height"
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

import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import MessageCard from '../views/MessageCard.vue';
import { useQuasar } from 'quasar';

const store = useFeedbackStore();
const quasar = useQuasar();

const open = ref(false);
const menu = ref(false);

const sm = computed(() => quasar.screen.lt.sm);

const openMenu = (value: boolean) => {
  if (store.onconnection || store.dragging || menu.value) return;

  open.value = value;
};

const hello = computed(() => store.feedback.hello ?? defaultMessage);
const startAdmin = computed(() => store.feedback.startAdmin ?? defaultMessage);
const cancel = computed(() => store.feedback.cancel ?? defaultMessage);

const messages = computed((): any => [
  {
    label: 'Приветствие',
    data: hello.value,
    condition: store.feedback.hello !== null,
    desc: 'Это сообщение будет отправлено перед первым вопросом и опрос начнется, только после нажатия на кнопку. Оставьте поля пустыми, тогда опрос начнется сразу с вопросов.',
    method: 'hello',
  },
  {
    label: 'Стартовое для администратора',
    data: startAdmin.value,
    condition: store.feedback.startAdmin !== null,
    desc: 'Когда пользователь начнёт проходить форму, администратор получит уведомление.',
    method: 'start-admin',
  },
  {
    label: 'Сообщение при отмене',
    data: cancel.value,
    condition: store.feedback.cancel !== null,
    desc: 'В случае если пользователь отменит прохожение формы, ему пришлется сообщение.',
    method: 'cancel',
  },
]);
</script>

<style scoped lang="scss"></style>
