<template>
  <div class="row justify-between items-center">
    <div class="">Статистика и действия</div>

    <q-btn
      dense
      class="rounded"
      flat
      size="md"
      color="primary"
      icon="more_vert"
    >
      <answers-menu></answers-menu>

      <q-tooltip class="bott-tooltip" anchor="top middle" self="bottom middle">
        Действия с ответами
      </q-tooltip>
    </q-btn>
  </div>

  <q-list bordered class="rounded overflow-hidden">
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="(info, index) of data"
        :key="index"
      >
        <q-item dense>
          <q-item-section class="text-weight-bold">
            {{ info.label }}
          </q-item-section>

          <q-item-section side>
            <q-badge
              color="orange"
              text-color="black"
              class="q-pa-xs"
              :label="info.value"
            />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AnswersMenu from './AnswersMenu.vue';
import { useFeedbackStore } from '../../../stores/feedbackStore';

const store = useFeedbackStore();

const data = computed(() => [
  {
    label: 'Всего ответов',
    value: store.answersCount.all,
  },
  {
    label: 'Из них незавершенных',
    value: store.answersCount.unfinished,
  },
  {
    label: 'Из них не прочитанных',
    value: store.answersCount.unread,
  },
]);
</script>

<style scoped lang="scss"></style>
