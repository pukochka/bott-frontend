<template>
  <div class="relative-position">
    <div class="q-pa-xs text-subtitle1 text-center">Выберите тип вопроса</div>

    <q-separator></q-separator>

    <types-question-list @create="createMessage"></types-question-list>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedback } from '../../api/queries';

import TypesQuestionList from '../views/TypesQuestionList.vue';

const feedback = useFeedbackStore();

const loading = ref(false);
const createMessage = (type: any) => {
  const message = feedback.selectedMessage;
  const x = feedback.feedback.inputs.length
    ? (message?.platform?.position.x ?? 0) + 300
    : 0;

  if (message?.type !== 4) {
    loading.value = true;
    fetchFeedback('create-input', {
      type: type,
      pos_x: x,
      pos_y: message?.platform?.position.y ?? 0,
      after_id: message?.id ?? null,
      after_type: message?.type ?? null,
    }).then(() => {
      loading.value = false;
      feedback.menu.create = false;
      feedback.onconnection = false;
      feedback.closeDialog('touch');
    });

    return;
  }

  feedback.openDialog('crossroad_option');
};
</script>

<style scoped lang="scss"></style>
