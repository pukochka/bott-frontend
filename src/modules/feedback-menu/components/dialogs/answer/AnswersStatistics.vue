<template>
  <div class="q-py-xs">Статистика</div>

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
            <div class="absolute-right row items-stretch">
              <q-btn
                flat
                square
                dense
                color="primary"
                :icon="info.icon"
                :loading="info.loading"
                v-if="info.condition"
                @click="filterAnswers(info.name)"
              >
                <q-tooltip
                  class="bott-tooltip text-center"
                  anchor="top middle"
                  self="bottom middle"
                >
                  {{ info.tooltip }}
                </q-tooltip>
              </q-btn>

              <q-badge
                color="primary"
                text-color="white"
                class="text-weight-bold text-body2 rounded"
                :label="info.value"
              />
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFeedbackStore } from '../../../stores/feedbackStore';
import { mdiFilterOffOutline, mdiFilterOutline } from '@quasar/extras/mdi-v7';
import { fetchFeedbackAnswer } from '../../../api/queries';

const emit = defineEmits<{
  (e: 'filter', status?: number): void;
}>();

const store = useFeedbackStore();

const filter = ref<FilterNames>('all');

const loading = ref({
  all: false,
  unfinished: false,
  unread: false,
});

const filterAnswers = (name: FilterNames) => {
  loading.value[name] = true;

  const status = statuses[name];

  fetchFeedbackAnswer('index', { status }, () => {
    emit('filter', status);
    filter.value = name;
  }).then(() => {
    loading.value[name] = false;
  });
};

const statuses = {
  all: undefined,
  unfinished: 0,
  unread: 1,
};

const data = computed(
  (): Array<InfoItem> => [
    {
      label: 'Всего ответов',
      value: store.answersCount.all,
      tooltip: 'Показать все',
      icon: mdiFilterOffOutline,
      loading: loading.value.all,
      condition: filter.value !== 'all',
      name: 'all',
    },
    {
      label: 'Из них незавершенных',
      value: store.answersCount.unfinished,
      tooltip: 'Показать незавершенные',
      icon: mdiFilterOutline,
      loading: loading.value.unfinished,
      condition: ['all', 'unread'].includes(filter.value),
      name: 'unfinished',
    },
    {
      label: 'Из них непрочитанных',
      value: store.answersCount.unread,
      tooltip: 'Показать непрочитанные',
      icon: mdiFilterOutline,
      loading: loading.value.unread,
      condition: ['all', 'unfinished'].includes(filter.value),
      name: 'unread',
    },
  ]
);

type FilterNames = 'all' | 'unfinished' | 'unread';
interface InfoItem {
  label: string;
  value: number;
  tooltip: string;
  icon: string;
  loading: boolean;
  condition: boolean;
  name: FilterNames;
}
</script>

<style scoped lang="scss"></style>
