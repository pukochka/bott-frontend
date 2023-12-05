<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <q-card flat bordered class="rounded fit">
      <div class="row items-center justify-between q-pa-sm no-wrap">
        <div class="text-weight-bold text-primary ellipsis">
          {{ props.answer.answer }}
        </div>

        <div class="row">
          <q-btn
            flat
            padding="2px"
            color="primary"
            icon="more_vert"
            class="rounded"
          >
            <answer-item-menu :answer="props.answer"></answer-item-menu>
          </q-btn>
        </div>
      </div>

      <q-list bordered separator dense>
        <q-item v-for="(info, index) of data" :key="index">
          <q-item-section>{{ info.label }}</q-item-section>

          <q-item-section side>
            <q-btn
              flat
              no-caps
              no-wrap
              padding="0px"
              :color="info.color"
              class="rounded"
              @click="info.action"
            >
              <div class="ellipsis">{{ info.value }}</div>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { copyToClipboard } from 'quasar';
import { useNotify } from '../../../../inline-menu/stores/helpers';

import { defaultAnswer, statuses } from '../../../stores/feedbackModels';

import AnswerItemMenu from './AnswerItemMenu.vue';

const props = withDefaults(defineProps<AnswerItemProps>(), {
  answer: () => defaultAnswer,
});

const status = computed(() => statuses[props.answer.status.id] ?? '');

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
