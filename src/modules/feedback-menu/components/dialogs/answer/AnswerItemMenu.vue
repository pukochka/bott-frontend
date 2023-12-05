<template>
  <q-menu class="bott-portal-menu">
    <q-list dense>
      <q-item
        clickable
        v-for="(button, index) of buttons"
        :key="index"
        :href="button.link"
        :target="button.link ? '_blank' : ''"
        v-show="button.condition"
        @click="button.action"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="26px" />
        </q-item-section>

        <q-item-section>{{ button.label }}</q-item-section>
      </q-item>

      <q-inner-loading :showing="loading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../../stores/feedbackStore';
import { fetchFeedbackAnswer } from '../../../api/queries';
import { useDialog } from '../../../../file-manager/stores/useDialog';

import { defaultAnswer } from '../../../stores/feedbackModels';

const props = withDefaults(defineProps<AnswerItemMenuProps>(), {
  answer: () => defaultAnswer,
});

const store = useFeedbackStore();

const loading = ref(false);

const params = computed(
  () =>
    `?bot_id=${config.bot.id}&id=${store.message.id}&answer_id=${props.answer.id}`
);

const readAnswer = () => {
  loading.value = true;

  fetchFeedbackAnswer('read', { answer_id: props.answer.id }).then(() => {
    loading.value = false;
  });
};

const deleteAnswer = () => {
  useDialog('Вы уверены, что хотите удалить ответ?', true).onOk(() => {
    loading.value = true;

    fetchFeedbackAnswer('delete', { answer_id: [props.answer.id] }, () => {
      store.answers = store.answers.filter(
        (item) => item.id !== props.answer.id
      );
    }).then(() => {
      loading.value = false;
    });
  });
};

const buttons = computed(() => [
  {
    label: 'Ответить',
    color: 'primary',
    icon: 'send',
    link: `/lk/common/messages/feedback/answer-answer${params.value}`,
    action: undefined,
    condition: true,
  },
  {
    label: 'Отметить прочитанным',
    color: 'positive',
    icon: 'check',
    link: undefined,
    action: readAnswer,
    condition: props.answer.status.id === 1,
  },
  {
    label: 'Просмотреть ответ',
    color: 'warning',
    icon: 'visibility',
    link: `lk/common/messages/feedback/answers${params.value}`,
    action: undefined,
    condition: true,
  },
  {
    label: 'Удалить',
    color: 'red',
    icon: 'close',
    link: undefined,
    action: deleteAnswer,
    condition: true,
  },
]);

interface AnswerItemMenuProps {
  answer: FeedbackAnswer;
}
</script>

<style scoped lang="scss"></style>
