<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    @before-show="updateShow"
    v-model="feedback.dialogs.message"
  >
    <div class="row justify-center">
      <q-card bordered flat class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Настройка вопроса"></dialog-header>

        <q-card-section class="q-pt-none q-gutter-sm">
          <div class="">
            <div>Текст вопроса</div>

            <q-input
              autofocus
              autogrow
              outlined
              counter
              class="bott-input--rounded"
              v-model="text.value"
              :maxlength="text.max"
              :rules="[
                () => text.required || 'Введено неверное количество символов',
              ]"
            >
              <template #append>
                <emoji-menu @select="addEmoji"></emoji-menu>
              </template>
            </q-input>
          </div>

          <component
            :is="component"
            :message="feedback.selectedMessage"
            :update="loading.data"
            @load="loading.update = false"
          />

          <radio-item
            label="Разрешить пропустить вопрос"
            desc="Пользователь сможет нажать на кнопку пропуска вопроса и перейти к следующему вопросу"
            :model="confirm"
            @update="(val) => (confirm = val)"
          ></radio-item>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
          <q-btn
            no-caps
            flat
            class="rounded"
            size="md"
            label="Удалить"
            color="red"
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
            class="rounded"
            unelevated
            size="md"
            label="Сохранить"
            color="primary"
            :disable="!text.required"
            :loading="loading.update"
            @click="updateMessage"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';
import { useFeedbackStore } from '../../stores/feedbackStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import FileView from './sections/FileView.vue';
import SimpleView from './sections/SimpleView.vue';
import QuizView from './sections/QuizView.vue';
import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import RadioItem from '../views/RadioItem.vue';

const feedback = useFeedbackStore();

const text = ref({
  value: '',
  max: 512,
  min: 1,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const confirm = ref(false);
const loading = ref({
  delete: false,
  update: false,
  data: false,
});

const setting: any = {
  1: SimpleView,
  2: FileView,
  3: QuizView,
};

const component = computed(() => setting[feedback.selectedMessage?.type ?? 1]);

const addEmoji = (value: string) => (text.value.value += value);

const updateMessage = () => {
  loading.value.update = true;
  loading.value.data = true;

  fetchFeedback('update-input', {
    input_id: feedback.selectedMessage?.id ?? 0,
    text: text.value.value,
    is_confirm: confirm.value,
    type: feedback.selectedMessage?.type ?? 1,
  }).then(() => (loading.value.data = false));
};

const deleteQuestion = () => {
  useDialog('Вы уверены, что хотите удалить вопрос?', true).onOk(() => {
    loading.value.delete = true;
    fetchFeedback('delete-input', {
      type: feedback.selectedMessage?.type ?? 1,
      input_id: feedback.selectedMessage?.id ?? 1,
    }).then(() => {
      loading.value.delete = false;
      feedback.closeDialog('message');
    });
  });
};

const updateShow = () => {
  confirm.value = feedback.selectedMessage?.confirm ?? false;
  text.value.value = feedback.selectedMessage?.text ?? '';
};
</script>

<style lang="scss" scoped></style>
