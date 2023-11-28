<template>
  <div class="rounded bg-grey-2 q-pa-xs">
    <div class="row no-wrap justify-between items-center">
      <div class="row no-wrap q-gutter-xs">
        <q-btn
          class="rounded"
          flat
          dense
          color="primary"
          icon="close"
          :loading="loading.delete"
          @click="deleteQuizItem"
        >
          <q-tooltip anchor="top middle" self="bottom middle">
            Удалить ответ
          </q-tooltip>
        </q-btn>

        <q-btn
          class="rounded"
          flat
          dense
          color="primary"
          icon="edit"
          @click="editQuizItem"
        >
          <q-tooltip anchor="top middle" self="bottom middle">
            Изменить текст ответа
          </q-tooltip>
        </q-btn>
      </div>

      <div class="text-subtitle1 ellipsis">{{ item.text }}</div>

      <div class="row no-wrap q-gutter-xs">
        <q-btn
          v-if="last"
          :loading="loading.up"
          class="rounded"
          flat
          dense
          color="primary"
          icon="keyboard_arrow_up"
          @click="moveQuiz('up')"
        >
          <q-tooltip anchor="top middle" self="bottom middle">
            Сделать {{ item.sort }}-м ответом
          </q-tooltip>
        </q-btn>

        <q-btn
          v-if="first"
          :loading="loading.down"
          class="rounded"
          flat
          dense
          color="primary"
          icon="keyboard_arrow_down"
          @click="moveQuiz('down')"
        >
          <q-tooltip anchor="top middle" self="bottom middle">
            Сделать {{ item.sort + 2 }}-м ответом
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../../api/queries';

import { usePSStore } from '../../../stores/PSstore';

import { defaultQuiz } from '../models';

const props = withDefaults(defineProps<QuizItemProps>(), {
  item: () => defaultQuiz,
});

const store = usePSStore();

const loading = ref({
  up: false,
  down: false,
  delete: false,
});

const first = computed(() => props.item.sort !== 0);
const last = computed(() => props.item.sort !== props.item.text.length - 1);

const editQuizItem = () => {
  // main.selectedQuiz = props.item;
  // main.openDialog('edit_quiz_item');
};

const deleteQuizItem = () => {
  loading.value.delete = true;

  fetchFeedback('delete-select-option', {
    option_id: props.item.id,
    input_id: 1,
  }).then(() => {
    loading.value.delete = false;
  });
};

const moveQuiz = (side: 'up' | 'down') => {
  loading.value[side] = true;

  fetchFeedback(`${side}-select-option`, {
    option_id: props.item.id,
    input_id: 1,
  }).then(() => {
    loading.value[side] = false;
  });
};

interface QuizItemProps {
  item: FBQuiz;
}
</script>

<style lang="scss" scoped></style>
