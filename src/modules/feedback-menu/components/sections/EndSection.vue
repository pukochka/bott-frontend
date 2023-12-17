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
      :style="{ width: (open || sm) && !notifyDisabled ? '240px' : '170px' }"
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
          bordered
          @menu="(value) => (menu = value)"
        ></message-card>
      </div>
    </div>

    <q-inner-loading :showing="notifyDisabled">
      <div class="q-pa-md text-center text-weight-bold">
        Уведомления и напоминания отключены
      </div>

      <q-btn
        no-caps
        flat
        color="primary"
        padding="4px"
        label="Включить"
        class="rounded"
        @click="store.openDialog('notify')"
      />
    </q-inner-loading>
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
const notifyDisabled = computed(() => !store.feedback.setting.is_notice);

const openMenu = (value: boolean) => {
  if (
    store.onconnection ||
    store.dragging ||
    menu.value ||
    notifyDisabled.value
  )
    return;

  open.value = value;
};

const startAdmin = computed(() => store.feedback.startAdmin ?? defaultMessage);
const admin = computed(() => store.feedback.admin ?? defaultMessage);
const answerAdmin = computed(
  () => store.feedback.answerAdmin ?? defaultMessage
);

const messages = computed((): any => [
  {
    label: 'Стартовое для администратора',
    data: startAdmin.value,
    condition: store.feedback.startAdmin !== null,
    desc: 'Когда пользователь начнёт проходить форму, администратор получит уведомление.',
    method: 'start-admin',
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
