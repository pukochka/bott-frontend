<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="feedback.dialogs.administrator_answer"
    @before-show="update"
  >
    <q-card class="dialog-rounded" style="width: 100%">
      <dialog-header label="Ответить пользователю"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autofocus
          autogrow
          counter
          :maxlength="1024"
          v-model="text"
          placeholder="Написать сообщение..."
          class="bott-input--rounded"
        />
      </q-card-section>

      <q-card-section
        class="q-pt-none row justify-end items-center q-gutter-x-sm"
      >
        <q-btn
          flat
          no-caps
          size="md"
          class="rounded"
          color="red"
          label="Закрыть"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          color="primary"
          label="Ответить"
          :loading="loading"
          @click="replyAnswer"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFeedbackStore } from '../../../stores/feedbackStore';
import { fetchFeedbackAnswer } from '../../../api/queries';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const feedback = useFeedbackStore();

const text = ref('');
const loading = ref(false);

const replyAnswer = () => {
  loading.value = true;

  fetchFeedbackAnswer('set-answer', {
    text: text.value,
    answer_id: feedback.selectedAnswer?.id ?? 0,
  }).then(() => {
    feedback.updateAnswers(() => {
      loading.value = false;
      feedback.closeDialog('administrator_answer');
    });
  });
};

const update = () => {
  text.value = '';
};
</script>

<style scoped lang="scss"></style>
