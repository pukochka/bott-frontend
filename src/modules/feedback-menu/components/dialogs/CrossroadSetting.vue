<template>
  <q-dialog
    persistent
    position="bottom"
    @before-show="updateShow"
    @before-hide="updateHide"
    v-model="feedback.dialogs.crossroad"
  >
    <q-card flat bordered class="dialog-rounded" style="width: 100%">
      <dialog-header label="Изменение нескольких ответов"></dialog-header>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <q-input
          outlined
          autogrow
          v-model="text"
          label="Текст сообщения"
          class="bott-input--rounded"
        />

        <div class="">Изменение заявок</div>

        <div class="text-center q-pa-md" v-if="!buttons.length">
          Пока нет заявок
        </div>

        <div class="row" v-else>
          <q-list
            dense
            class="col-12 overflow-hidden rounded"
            bordered
            separator
          >
            <quiz-item
              method="crossroad-option"
              v-for="button of buttons"
              :key="button.id"
              :button="button"
              :length="buttons.length"
            ></quiz-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          no-caps
          flat
          class="rounded"
          size="md"
          color="red"
          label="Удалить"
          :loading="loading.delete"
          @click="deleteQuestion"
        />

        <q-btn
          flat
          no-caps
          class="rounded"
          size="md"
          label="Закрыть"
          color="primary"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          class="rounded"
          size="md"
          label="Сохранить"
          color="primary"
          :loading="loading.update"
          @click="updateCrossroad"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { useDialog } from 'src/utils/use/useDialog';
import { fetchFeedback } from '../../api/queries';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import QuizItem from '../views/QuizItem.vue';

const feedback = useFeedbackStore();

const text = ref('');
const loading = ref({
  delete: false,
  update: false,
});
const buttons = computed(
  () => feedback.selectedMessage?.crossroad?.options ?? []
);

const deleteQuestion = () => {
  useDialog('Вы уверены, что хотите удалить вопрос?', true).onOk(() => {
    loading.value.delete = true;

    fetchFeedback('delete-input', {
      type: feedback.selectedMessage?.type ?? 1,
      input_id: feedback.selectedMessage?.id ?? 1,
    }).then(() => {
      loading.value.delete = false;
      feedback.closeDialog('crossroad');
    });
  });
};

const updateCrossroad = () => {
  loading.value.update = true;

  fetchFeedback('update-input', {
    input_id: feedback.selectedMessage?.id ?? 0,
    text: text.value,
    type: 4,
    is_confirm: false,
  }).then(() => {
    loading.value.update = false;
    feedback.closeDialog('crossroad');
  });
};

const updateShow = () => {
  text.value = feedback.selectedMessage?.text ?? '';
};

const updateHide = () => {
  feedback.hideMenu();
};
</script>

<style scoped lang="scss"></style>
