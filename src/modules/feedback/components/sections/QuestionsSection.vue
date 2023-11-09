<template>
  <div style="height: 80px" class="relative-position" v-if="empty">
    <div class="absolute-center text-weight-bold text-h6">
      {{ config.text.empty_questions }}
    </div>
  </div>

  <div class="row q-col-gutter-md" v-else>
    <question-item
      v-for="(question, index) of main.questions"
      :key="question.id"
      :question="question"
      :number="index + 1"
    ></question-item>
  </div>

  <div class="row justify-center q-mt-md" v-if="exitLimit">
    <div class="col-12 col-sm-6">
      <q-btn
        class="rounded fit"
        unelevated
        size="md"
        color="primary"
        label="Добавить вопрос"
        @click="main.openDialog('create_question')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '../../config';

import { computed } from 'vue';

import { useFBStore } from '../../stores/FBStore';

import QuestionItem from '../items/QuestionItem.vue';

const main = useFBStore();

const empty = computed(() => main.questions.length === 0);
const exitLimit = computed(
  () => main.questions.length < config.limits.maxQuestionCount
);
</script>

<style lang="scss" scoped></style>
