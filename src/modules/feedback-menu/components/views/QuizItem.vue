<template>
  <q-item class="relative-position">
    <div class="row absolute-left">
      <q-btn square dense flat size="md" color="primary" icon="edit">
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Изменить текст кнопки
        </q-tooltip>

        <q-popup-proxy
          class="rounded bordered bott-portal-menu"
          @before-show="updateText"
        >
          <q-input
            dense
            outlined
            counter
            label="Название"
            class="bott-input--rounded"
            v-model="text.value"
            :maxlength="text.max"
            :rules="[
              () => text.required || 'Введено неверное количество символов',
            ]"
          >
            <template v-slot:append>
              <q-btn
                dense
                flat
                class="rounded"
                color="primary"
                icon="check"
                :loading="loading.edit"
                :disable="!text.required"
                @click="editQuiz"
              />

              <q-btn
                dense
                flat
                class="rounded"
                color="red"
                icon="close"
                v-close-popup
              />
            </template>
          </q-input>
        </q-popup-proxy>
      </q-btn>

      <q-btn
        square
        dense
        flat
        size="md"
        color="primary"
        icon="close"
        v-if="props.delete"
        @click="deleteQuiz"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Удалить кнопку
        </q-tooltip>
      </q-btn>
    </div>

    <div class="absolute-center ellipsis" style="max-width: 80%">
      {{ button.text }}
    </div>

    <div class="row absolute-right">
      <q-btn
        dense
        flat
        square
        size="md"
        color="primary"
        icon="expand_less"
        v-if="button.sort !== 0"
        :loading="loading.up"
        @click="moveQuiz('up')"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Переместить выше
        </q-tooltip>
      </q-btn>

      <q-btn
        dense
        flat
        square
        size="md"
        color="primary"
        icon="expand_more"
        v-if="button.sort !== props.length - 1"
        :loading="loading.down"
        @click="moveQuiz('down')"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Переместить ниже
        </q-tooltip>
      </q-btn>
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useFeedbackStore } from '../../stores/feedbackStore';

import { defaultQuiz } from '../message/models';
import { fetchFeedback } from '../../api/queries';
import { update } from '../../utils/create';

const props = withDefaults(defineProps<QuizItemProps>(), {
  button: () => defaultQuiz,
  length: 0,
  delete: false,
  method: 'select-option',
});

const store = useFeedbackStore();

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});
const loading = ref({
  up: false,
  down: false,
  delete: false,
  edit: false,
});

const deleteQuiz = () => {
  loading.value.delete = true;

  fetchFeedback(
    `delete-${props.method}`,
    {
      input_id: store.selectedMessage?.id ?? 0,
      option_id: props.button.id,
    },
    store.updateQuestion
  ).then(() => (loading.value.delete = false));
};

const editQuiz = () => {
  loading.value.edit = true;

  fetchFeedback(
    `update-${props.method}`,
    {
      input_id: store.selectedMessage?.id ?? 0,
      option_id: props.button.id,
      text: text.value.value,
    },
    store.updateQuestion
  ).then(() => (loading.value.edit = false));
};

const moveQuiz = (side: 'down' | 'up') => {
  loading.value[side] = true;

  fetchFeedback(
    `${side}-${props.method}`,
    {
      input_id: store.selectedMessage?.id ?? 0,
      option_id: props.button.id,
    },
    store.updateQuestion
  ).then(() => (loading.value[side] = false));
};

const updateText = () => {
  text.value.value = props.button.text;
};

interface QuizItemProps {
  button: FBQuiz;
  length: number;
  method: 'select-option' | 'crossroad-option';
  delete?: boolean;
}
</script>

<style lang="scss" scoped></style>
