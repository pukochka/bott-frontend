<template>
  <div class="row no-wrap rounded-container-grey">
    <div class="q-pa-sm">
      <div class="text-subtitle1">Варианты ответа</div>
      <div
        v-if="data.options.length === 0"
        class="text-center rounded bg-red-2 q-py-xs q-px-sm"
      >
        Ответов пока нет
      </div>

      <div class="row q-col-gutter-sm" v-else>
        <div
          class="col-12 col-sm-6"
          v-for="option in data.options"
          :key="option.id"
        >
          <div class="rounded bg-blue-2 q-py-xs q-px-sm ellipsis text-center">
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>

    <q-space />
  </div>
</template>

<script setup lang="ts">
import { defaultQuizQuestion } from '../../../stores/FBModels';

const props = withDefaults(defineProps<QuizSectionProps>(), {
  data: () => defaultQuizQuestion,
});

interface QuizSectionProps {
  data: FBQuizQuestion;
}
</script>

<style lang="scss" scoped></style>
