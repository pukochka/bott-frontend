<template>
  <q-dialog
    persistent
    position="bottom"
    @before-hide="updateHide"
    v-model="store.dialogs.crossroad_option"
  >
    <q-card flat bordered class="rounded" style="width: 100%">
      <dialog-header label="Название кнопки ответа"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          outlined
          counter
          label="Название"
          class="bott-input--rounded"
          :maxlength="text.max"
          :rules="[
            () => text.required || 'Введено неверное количество символов',
          ]"
          v-model="text.value"
        />

        <types-question-list
          :selected="type"
          @create="(value) => (type = value)"
          class="rounded overflow-hidden q-mt-sm"
        ></types-question-list>
      </q-card-section>

      <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
        <q-btn
          flat
          no-caps
          size="md"
          class="rounded"
          color="red"
          label="Отмена"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          color="primary"
          label="Добавить"
          :loading="loading"
          :disable="!text.required"
          @click="addCrossroadOption"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePSStore } from '../../stores/feedbackStore';

import { fetchFeedback } from '../../api/queries';
import TypesQuestionList from '../views/TypesQuestionList.vue';
import DialogHeader from '../../../../components/dialogs-sections/DialogHeader.vue';

const store = usePSStore();

const loading = ref(false);
const type = ref(1);
const text = ref({
  value: '',
  min: 2,
  max: 64,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const addCrossroadOption = () => {
  const message = store.selectedMessage;
  loading.value = true;

  fetchFeedback('add-crossroad-option', {
    type: type.value,
    pos_x: (message?.platform?.bounds.center.x ?? 0) + 300 ?? null,
    pos_y: message?.platform?.bounds.center.y ?? null,
    input_id: message?.id ?? 1,
    text: text.value.value,
  }).then(() => {
    loading.value = false;
    store.menu.create = false;
    store.closeDialog('crossroad_option');
  });
};

const updateHide = () => {
  type.value = 1;
  text.value.value = '';
  if (store.action !== null) store.action();
};
</script>

<style scoped lang="scss"></style>
