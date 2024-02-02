<template>
  <div class="q-gutter-y-sm">
    <q-list
      dense
      bordered
      separator
      class="rounded overflow-hidden"
      v-if="buttons.length"
    >
      <quiz-item
        delete
        method="select-option"
        v-for="button of buttons"
        :key="button.id"
        :button="button"
        :length="buttons.length"
      ></quiz-item>
    </q-list>

    <div class="text-center text-body2 q-pa-md text-grey-7" v-else>
      Ответов пока нет
    </div>

    <div v-if="state">
      <div>Текст ответа</div>

      <q-input
        dense
        autofocus
        outlined
        counter
        v-model="text.value"
        :maxlength="text.max"
        class="bott-input--rounded"
        :rules="[() => text.required || 'Введено неверное количество символов']"
      >
        <template v-slot:append>
          <q-btn
            dense
            flat
            class="rounded"
            color="primary"
            icon="check"
            :loading="loading"
            :disable="!text.required"
            @click="addQuizItem"
          />

          <q-btn
            dense
            flat
            class="rounded"
            color="red"
            icon="close"
            @click="state = false"
          />
        </template>
      </q-input>
    </div>

    <div class="row justify-center" v-if="condition">
      <q-btn
        flat
        no-caps
        size="md"
        color="primary"
        label="Добавить ответ"
        class="col-12 col-sm-6 rounded"
        @click="openState"
      />
    </div>

    <radio-item
      label="Мульти выбор"
      desc="Пользователю можно будет выбрать несколько ответов"
      :model="multiply"
      @update="(val) => (multiply = val)"
    ></radio-item>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { fetchFeedback } from '../../../api/queries';
import { useFeedbackStore } from '../../../stores/feedbackStore';

import { defaultInput } from '../../../stores/feedbackModels';

import QuizItem from '../../views/QuizItem.vue';
import RadioItem from '../../views/RadioItem.vue';

const props = withDefaults(defineProps<QuizQuestionProps>(), {
  message: () => defaultInput,
  update: false,
});

const emit = defineEmits<{
  (e: 'load'): void;
}>();

const feedback = useFeedbackStore();

const text = ref({
  value: '',
  max: 64,
  min: 1,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const state = ref(false);
const loading = ref(false);
const multiply = ref(false);

const buttons = computed(() => props.message.select?.options ?? []);
const condition = computed(() => !state.value && buttons.value.length < 10);

const openState = () => {
  state.value = true;
  text.value.value = '';
};

const addQuizItem = () => {
  loading.value = true;

  fetchFeedback(
    'add-select-option',
    {
      text: text.value.value,
      input_id: feedback.selectedMessage?.id ?? 0,
    },
    feedback.updateQuestion
  ).then(() => {
    state.value = false;
    loading.value = false;
  });
};

const updateQuiz = () => {
  fetchFeedback(
    'update-input-select',
    {
      input_id: props.message.id,
      is_multiple: multiply.value,
    },
    feedback.updateQuestion
  ).then(() => {
    feedback.closeDialog('message');
    emit('load');
  });
};

watch(
  () => props.update,
  (val) => {
    if (!val) updateQuiz();
  }
);

onMounted(() => {
  multiply.value = props.message.select?.is_multiple ?? false;
});

interface QuizQuestionProps {
  message: MessageFeedbackItem;
  update: boolean;
}
</script>

<style lang="scss" scoped></style>
