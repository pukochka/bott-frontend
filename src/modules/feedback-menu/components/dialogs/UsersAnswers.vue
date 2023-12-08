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
          <answers-statistics @filter="updatePagination"></answers-statistics>

          <div class="q-py-xs">Все ответы</div>

          <div class="scroll-x bordered rounded">
            <q-list style="min-width: 600px">
              <q-item dense>
                <q-item-section side>
                  <q-btn
                    dense
                    class="rounded"
                    flat
                    padding="2px"
                    color="primary"
                    icon="more_vert"
                  >
                    <answers-menu></answers-menu>

                    <q-tooltip
                      class="bott-tooltip"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      Действия с ответами
                    </q-tooltip>
                  </q-btn>
                </q-item-section>

                <q-item-section>Ответ</q-item-section>
                <q-item-section class="text-center">
                  Пользователь
                </q-item-section>
                <q-item-section class="text-center">
                  Время ответа
                </q-item-section>
                <q-item-section class="text-center">Статус</q-item-section>
              </q-item>

              <q-separator />

              <answer-item
                v-for="answer of paginationAnswers"
                :key="answer.id"
                :answer="answer"
              ></answer-item>

              <q-item v-if="!paginationAnswers.length">
                <q-item-section class="text-center q-pa-md">
                  Ответов пока нет...
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div
            class="row justify-center q-gutter-x-sm"
            v-if="store.answers.length"
          >
            <q-btn
              v-for="(button, index) of pagination"
              :key="index"
              flat
              :dense="sm"
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
import AnswersMenu from './answer/AnswersMenu.vue';
import { useQuasar } from 'quasar';

const store = useFeedbackStore();
const quasar = useQuasar();

const loading = ref({
  show: true,
  next: false,
  prev: false,
  last: false,
  first: false,
});

const page = ref(1);
const count = ref(5);
const offset = ref(0);
const filter = ref<any>(undefined);
const statuses: Record<any, 'unfinished' | 'unread'> = {
  0: 'unfinished',
  1: 'unread',
};

const sm = computed(() => quasar.screen.lt.sm);

const paginationAnswers = computed(() =>
  store.answers.filter(
    (_, index) => index >= count.value - 5 && index < count.value
  )
);

const pages = computed(() =>
  Math.ceil(store.answersCount[statuses?.[filter.value] ?? 'all'] / 5)
);

const updatePagination = (value?: any) => {
  filter.value = value;

  page.value = 1;
  count.value = 5;
  offset.value = 0;
};

const updateShow = () => {
  updatePagination();

  loading.value.show = true;

  Promise.all([
    fetchFeedbackAnswer('index'),
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

  if (count.value + 5 > 25) {
    loading.value.next = true;

    const status = filter.value;

    fetchFeedbackAnswer(
      'index',
      { offset: (offset.value += 25), status },
      () => {
        count.value = 5;
        page.value++;
      }
    ).then(() => (loading.value.next = false));

    return;
  }

  page.value++;
  count.value += 5;
};

const prevPage = () => {
  if (loading.value.prev) return;

  if (count.value - 5 < 5) {
    loading.value.prev = true;

    const status = filter.value;

    fetchFeedbackAnswer(
      'index',
      { offset: (offset.value -= 25), status },
      () => {
        count.value = 25;
        page.value--;
      }
    ).then(() => (loading.value.prev = false));

    return;
  }

  page.value--;
  count.value -= 5;
};

const lastPage = () => {
  const lastOffset = Math.floor((pages.value * 5) / 25) * 25;

  if (offset.value === lastOffset) {
    count.value = pages.value % 5 === 0 ? 25 : (pages.value % 5) * 5;
    page.value = pages.value;

    return;
  }

  loading.value.last = true;

  const status = filter.value;

  fetchFeedbackAnswer('index', { offset: lastOffset, status }, () => {
    count.value = pages.value % 5 === 0 ? 25 : (pages.value % 5) * 5;
    page.value = pages.value;
    offset.value = lastOffset;
  }).then(() => (loading.value.last = false));
};
const firstPage = () => {
  if (offset.value === 0) {
    page.value = 1;
    count.value = 5;

    return;
  }

  loading.value.first = true;

  const status = filter.value;

  fetchFeedbackAnswer('index', { status }, () => {
    page.value = 1;
    offset.value = 0;
    count.value = 5;
  }).then(() => (loading.value.first = false));
};

const pagination = computed(() => [
  {
    label: 'Первая страница',
    icon: 'first_page',
    color: 'primary',
    disable: page.value === 1,
    loading: loading.value.first,
    action: firstPage,
  },
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
  {
    label: 'Последняя страница',
    icon: 'last_page',
    color: 'primary',
    disable: page.value === pages.value,
    loading: loading.value.last,
    action: lastPage,
  },
]);
</script>

<style scoped lang="scss"></style>
