<template>
  <q-menu class="bott-portal-menu">
    <q-list dense>
      <q-item
        clickable
        v-for="(button, index) of buttons"
        :key="index"
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

const answer = computed(() =>
  props.answer.answer === ''
    ? '<span class="text-red">Нет ответа</span>'
    : (props.answer.answer ?? '').replace(/\n/gi, '<br>')
);

const readAnswer = () => {
  loading.value = true;

  fetchFeedbackAnswer('read', { answer_id: props.answer.id }).then(() => {
    store.updateAnswers(() => {
      loading.value = false;
    });
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
      store.updateAnswers(() => {
        loading.value = false;
      });
    });
  });
};

const buttons = computed(() => [
  {
    label: 'Ответить',
    color: 'primary',
    icon: 'send',
    action: () => {
      store.selectedAnswer = props.answer;
      store.openDialog('administrator_answer');
    },
    condition: true,
  },
  {
    label: 'Отметить прочитанным',
    color: 'positive',
    icon: 'check',
    action: readAnswer,
    condition: props.answer.status.id === 1,
  },
  {
    label: 'Просмотреть заявку',
    color: 'warning',
    icon: 'visibility',
    action: () => {
      useDialog(answer.value);
    },
    condition: true,
  },
  {
    label: 'Удалить',
    color: 'red',
    icon: 'close',
    action: deleteAnswer,
    condition: true,
  },
]);

interface AnswerItemMenuProps {
  answer: FeedbackAnswer;
}
</script>

<style scoped lang="scss"></style>
