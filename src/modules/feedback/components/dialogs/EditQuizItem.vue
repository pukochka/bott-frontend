<template>
  <q-dialog
    v-model="main.dialogs.edit_quiz_item"
    position="top"
    persistent
    @before-show="update"
  >
    <q-card style="width: 100%">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Текст ответа</q-toolbar-title>

        <q-btn
          flat
          class="rounded"
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="text.value"
          :maxlength="text.max"
          dense
          autofocus
          outlined
          counter
          :rules="[() => text.required || config.text.danger_input]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          class="rounded"
          flat
          size="md"
          label="Отмена"
          color="primary"
          v-close-popup
        />

        <q-btn
          class="rounded"
          unelevated
          size="md"
          label="Сохранить"
          color="primary"
          :loading="loading"
          :disable="!text.required"
          @click="saveText"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import config from '../../config';

import { ref } from 'vue';

import { fetchFeedback } from '../../api/feedback';

import { useFBStore } from '../../stores/FBStore';

const main = useFBStore();

const loading = ref(false);

const text = ref({
  value: '',
  max: config.limits.maxInputLength,
  min: config.limits.minInputLength,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const saveText = () => {
  loading.value = true;
  fetchFeedback('update-select-option', {
    option_id: main.selectedQuiz?.id ?? 0,
    text: text.value.value,
  }).then(() => {
    loading.value = false;
    main.closeDialog('edit_quiz_item');
  });
};

const update = () => (text.value.value = main.selectedQuiz?.text ?? '');
</script>

<style lang="scss" scoped></style>
