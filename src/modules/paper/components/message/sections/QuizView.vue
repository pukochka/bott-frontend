<template>
  <div class="q-gutter-y-sm">
    <q-item-label header class="q-py-xs">Все ответы</q-item-label>

    <q-scroll-area
      :thumb-style="thumbStyle"
      :style="{ width: '100%', height: `${height}px` }"
    >
      <div class="q-gutter-y-sm">
        <quiz-item
          v-for="item of props.data.options"
          :key="item.id"
          :item="item"
        ></quiz-item>
      </div>

      <q-item-label
        v-if="!props.data.options.length"
        header
        class="text-center"
      >
        {{ 'config.text.empty_quiz_item ' }}
      </q-item-label>
    </q-scroll-area>

    <div class="" v-if="state">
      <q-item-label header class="q-py-xs">Текст ответа</q-item-label>

      <q-input
        dense
        autofocus
        outlined
        counter
        v-model="text.value"
        :maxlength="text.max"
        class="bott-input--rounded"
        :rules="[() => text.required || 'config.text.danger_input']"
      >
        <template v-slot:append>
          <q-btn
            class="rounded"
            dense
            flat
            color="primary"
            icon="check"
            :loading="loading"
            :disable="!text.required"
            @click="addQuizItem"
          />

          <q-btn
            class="rounded"
            dense
            flat
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

    <div class="">
      <q-item tag="label" v-ripple class="rounded">
        <q-item-section>
          <q-item-label>Множественный выбор</q-item-label>

          <q-item-label caption>
            Пользователю можно будет выбрать несколько ответов
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle color="primary" v-model="multiply" val="battery" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { fetchFeedback } from '../../../api/queries';

import { usePSStore } from '../../../stores/PSstore';

import { defaultQuizQuestion } from '../models';

import QuizItem from './QuizItem.vue';

const props = withDefaults(defineProps<QuizQuestionProps>(), {
  data: () => defaultQuizQuestion,
});

const emit = defineEmits<{
  (e: 'change', value: any): void;
}>();

const store = usePSStore();

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return this.value.length >= this.min && this.value.length <= this.max;
  },
});

const state = ref(false);
const loading = ref(false);
const multiply = ref(false);

const condition = computed(
  () => !state.value && props.data.options.length < 10
);

const height = computed(() =>
  props.data.options.length >= 4
    ? 180
    : !props.data.options.length
    ? 50
    : props.data.options.length * 50
);

const openState = () => {
  state.value = true;
  text.value.value = '';
};

const addQuizItem = () => {
  loading.value = true;

  fetchFeedback('add-select-option', {
    text: text.value.value,
    message_id: 1,
    input_id: 1,
  }).then(() => {
    state.value = false;
    loading.value = false;
  });
};

onMounted(() => {
  multiply.value = props.data.is_multiple ?? false;
  emit('change', { is_multiple: multiply.value });
});

watch(multiply, () => emit('change', { is_multiple: multiply.value }));

const thumbStyle = {
  margin: '2px',
  width: '5px',
  borderRadius: '10px',
};

interface QuizQuestionProps {
  data: FBQuizQuestion;
}
</script>

<style lang="scss" scoped></style>
