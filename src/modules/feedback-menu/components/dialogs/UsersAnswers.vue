<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="store.dialogs.answers"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Просмотр ответов пользователей"></dialog-header>

        <q-card-section
          class="q-pt-none q-gutter-y-xs relative-position"
          style="min-height: 200px"
        >
          <answers-statistics></answers-statistics>

          <div class="q-py-xs">Все ответы</div>

          <div class="">
            <div class="row q-col-gutter-sm" v-if="store.answers.length">
              <answer-item
                v-for="answer of paginationAnswers"
                :key="answer.id"
                :answer="answer"
              ></answer-item>
            </div>

            <div class="q-pa-xl text-center" v-else>Ответов пока нет...</div>
          </div>

          <div
            class="row justify-center q-gutter-x-sm"
            v-if="store.answers.length"
          >
            <q-btn
              v-for="(button, index) of pagination"
              :key="index"
              flat
              size="md"
              class="rounded"
              :disable="button.disable"
              :color="button.color"
              :icon="button.color === 'black' ? undefined : button.icon"
              :label="button.color === 'black' ? button.icon : ''"
              :loading="button.loading"
              @click="button.action"
            >
              <q-tooltip
                v-if="button.label"
                class="bott-tooltip"
                anchor="top middle"
                self="bottom middle"
              >
                {{ button.label }}
              </q-tooltip>
            </q-btn>
          </div>

          <q-inner-loading
            :showing="loading.show"
            class="bg-white"
            transition-show="none"
            transition-hide="fade"
          >
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { fetchFeedbackAnswer } from '../../api/queries';

import DialogHeader from '../../../../components/dialogs-sections/DialogHeader.vue';
import AnswersStatistics from './answer/AnswersStatistics.vue';
import AnswerItem from './answer/AnswerItem.vue';

const store = useFeedbackStore();

const loading = ref({
  show: true,
  next: false,
  prev: false,
});

const page = ref(1);
const count = ref(3);
const offset = ref(0);

const paginationAnswers = computed(() =>
  store.answers.filter(
    (_, index) =>
      index >= count.value - store.answersCount.visible && index < count.value
  )
);

const pages = computed(() => Math.ceil(store.answersCount.all / 3));

const updateShow = () => {
  page.value = 1;
  count.value = store.answersCount.visible;
  offset.value = 0;

  loading.value.show = true;

  Promise.all([
    fetchFeedbackAnswer('index', { limit: 24 }),
    fetchFeedbackAnswer(
      'count',
      undefined,
      (response) => (store.answersCount.all = response)
    ),
    fetchFeedbackAnswer(
      'count',
      { status: 0 },
      (response) => (store.answersCount.unfinished = response)
    ),
    fetchFeedbackAnswer(
      'count',
      { status: 1 },
      (response) => (store.answersCount.unread = response)
    ),
  ]).then(() => (loading.value.show = false));
};

const nextPage = () => {
  if (loading.value.next) return;

  if (count.value + store.answersCount.visible > 24) {
    loading.value.next = true;

    fetchFeedbackAnswer(
      'index',
      { limit: 24, offset: (offset.value += 24) },
      () => {
        count.value = store.answersCount.visible;
        page.value++;
      }
    ).then(() => (loading.value.next = false));

    return;
  }

  page.value++;
  count.value += store.answersCount.visible;
};
const prevPage = () => {
  if (loading.value.prev) return;

  if (count.value - store.answersCount.visible < store.answersCount.visible) {
    loading.value.prev = true;

    fetchFeedbackAnswer(
      'index',
      { limit: 24, offset: (offset.value -= 24) },
      () => {
        count.value = 24;
        page.value--;
      }
    ).then(() => (loading.value.prev = false));

    return;
  }

  page.value--;
  count.value -= store.answersCount.visible;
};

const pagination = computed(() => [
  {
    label: 'Предыдущая страница',
    icon: 'chevron_left',
    color: 'primary',
    disable: page.value === 1,
    loading: loading.value.prev,
    action: prevPage,
  },
  {
    label: undefined,
    icon: `${page.value} / ${pages.value}`,
    color: 'black',
    disable: false,
    loading: false,
    action: undefined,
  },
  {
    label: ' Следующая страница',
    icon: 'chevron_right',
    color: 'primary',
    disable: page.value === pages.value,
    loading: loading.value.next,
    action: nextPage,
  },
]);
</script>

<style scoped lang="scss"></style>
