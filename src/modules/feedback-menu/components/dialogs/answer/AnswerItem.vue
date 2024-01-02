<template>
  <q-item dense>
    <q-item-section side>
      <q-btn
        flat
        padding="2px"
        color="primary"
        icon="more_vert"
        class="rounded"
      >
        <answer-item-menu :answer="props.answer"></answer-item-menu>
      </q-btn>
    </q-item-section>

    <q-item-section>
      <div v-html="answer"></div>
    </q-item-section>

    <q-item-section>
      <div v-html="answerAdmin"></div>
    </q-item-section>

    <q-item-section v-for="(info, index) of data" :key="index">
      <q-btn
        flat
        no-caps
        no-wrap
        padding="0px"
        :color="info.color"
        class="rounded"
        @click="info.action"
      >
        <div class="ellipsis" v-html="info.value"></div>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { copyToClipboard } from 'quasar';
import { useNotify } from '../../../../inline/stores/helpers';

import { defaultAnswer, statuses } from '../../../stores/feedbackModels';

import AnswerItemMenu from './AnswerItemMenu.vue';

const props = withDefaults(defineProps<AnswerItemProps>(), {
  answer: () => defaultAnswer,
});

const status = computed(
  () => statuses[props.answer.status.id] ?? { label: '', color: '' }
);

const answer = computed(() =>
  props.answer.answer === ''
    ? '<span class="text-red">Нет ответа</span>'
    : (props.answer.answer ?? '').replace(/\n/gi, '<br>')
);

const answerAdmin = computed(() =>
  props.answer.adminAnswer?.text
    ? props.answer.adminAnswer.text ?? ''
    : '<span class="text-red">Нет ответа</span>'
);

const copyUsername = () => {
  copyToClipboard('@' + props.answer.user.username ?? '').then(() =>
    useNotify('Скопировано!')
  );
};

const data = computed(() => [
  {
    label: 'Пользователь',
    value: '@' + props.answer.user.username ?? '',
    color: 'primary',
    action: () => copyUsername(),
  },
  {
    label: 'Время ответа',
    value: props.answer.created_time ?? '',
    color: 'grey-7',
    action: undefined,
  },
  {
    label: 'Статус',
    value: status.value.label,
    color: status.value.color,
    action: undefined,
  },
]);

interface AnswerItemProps {
  answer: FeedbackAnswer;
}
</script>

<style scoped lang="scss"></style>
