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
          bordered
          @menu="(value) => (menu = value)"
        ></message-card>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';

import { defaultMessage } from 'src/utils/helpers/defaults';

import MessageCard from '../views/MessageCard.vue';
import { useQuasar } from 'quasar';

const feedback = useFeedbackStore();
const quasar = useQuasar();

const open = ref(false);
const menu = ref(false);

const sm = computed(() => quasar.screen.lt.sm);

const openMenu = (value: boolean) => {
  if (feedback.onconnection || feedback.dragging || menu.value) return;

  open.value = value;
};

const hello = computed(() => feedback.feedback.hello ?? defaultMessage);
const end = computed(() => feedback.feedback.end ?? defaultMessage);
const cancel = computed(() => feedback.feedback.cancel ?? defaultMessage);

const messages = computed((): any => [
  {
    label: 'Приветствие',
    data: hello.value,
    condition: feedback.feedback.hello !== null,
    desc: 'Это сообщение будет отправлено перед первым вопросом и опрос начнется, только после нажатия на кнопку. Оставьте поля пустыми, тогда опрос начнется сразу с вопросов.',
    method: 'hello',
  },
  {
    label: 'Прощание',
    data: end.value,
    condition: feedback.feedback.end !== null,
    desc: 'Сообщения после окончания прохождения формы.',
    method: 'end',
  },
  {
    label: 'Сообщение при отмене',
    data: cancel.value,
    condition: feedback.feedback.cancel !== null,
    desc: 'В случае если пользователь отменит прохожение формы, ему пришлется сообщение.',
    method: 'cancel',
  },
]);
</script>

<style scoped lang="scss"></style>
