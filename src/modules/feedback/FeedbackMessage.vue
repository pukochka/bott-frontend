<template>
  <div class="q-gutter-y-md q-pb-lg q-pt-md">
    <div class="row">
      <buttons-section></buttons-section>
    </div>

    <div class="row">
      <div class="col-12">
        <q-card-section
          class="q-pt-none relative-position"
          style="min-height: 200px"
        >
          <questions-section v-if="!loading"></questions-section>

          <q-inner-loading :showing="loading">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-card-section>
      </div>
    </div>
  </div>

  <edit-quiz-item></edit-quiz-item>

  <question-view></question-view>

  <create-question></create-question>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { fetchFeedback } from './api/feedback';

import QuestionsSection from './components/sections/QuestionsSection.vue';
import ButtonsSection from './components/sections/ButtonsSection.vue';

import EditQuizItem from './components/dialogs/EditQuizItem.vue';
import QuestionView from './components/dialogs/QuestionView.vue';
import CreateQuestion from './components/dialogs/CreateQuestion.vue';

const loading = ref(false);

// fetchFeedback('view').then(() => (loading.value = false));
</script>

<style scoped></style>
