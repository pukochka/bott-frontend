<template>
  <div
    class="row justify-center items-center"
    v-if="work.section === 'list' && work.selectedCategory"
  >
    <div class="row q-pt-xs items-center">
      <div class="text-caption q-pr-sm">
        <div class="">1 - 24</div>
      </div>

      <q-card
        flat
        bordered
        class="row rounded items-center no-wrap overflow-hidden"
      >
        <q-btn
          v-for="(button, index) of leftArrows"
          :key="index"
          flat
          square
          no-wrap
          no-caps
          size="md"
          color="primary"
          :dense="sm"
          :icon="button.icon"
          :disable="button.condition"
          @click="button.action"
        />

        <q-btn
          flat
          square
          no-wrap
          no-caps
          size="md"
          :dense="sm"
          :label="countLabel"
          :loading="loading.page"
          :disable="work.pagination.count === 1"
        >
          <q-menu cover class="bott-portal-menu">
            <q-input
              outlined
              style="min-width: 200px"
              mask="####"
              label="Введите номер страницы"
              class="bott-input--rounded"
              v-model="search"
            >
              <template #append>
                <q-btn
                  dense
                  flat
                  size="md"
                  color="primary"
                  class="rounded"
                  icon="check"
                  @click="setPage"
                />
              </template>
            </q-input>
          </q-menu>
        </q-btn>

        <q-btn
          v-for="(button, index) of rightArrows"
          :key="index"
          flat
          square
          no-wrap
          no-caps
          size="md"
          color="primary"
          :dense="sm"
          :icon="button.icon"
          :disable="button.condition"
          @click="button.action"
        />
      </q-card>
    </div>

    <div class="text-caption q-pl-sm">
      <div class="">Тикетов</div>
      <div class="">в категории <span class="text-primary">24</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
} from '@quasar/extras/mdi-v7';
import { useQuasar } from 'quasar';
import { useWorkStore } from '../../stores/workStore';
import { fetchSupportTicket } from '../../api/queries';

const quasar = useQuasar();
const work = useWorkStore();

const search = ref('');
const loading = ref<Record<LoadingNames, boolean>>({
  next: false,
  prev: false,
  last: false,
  first: false,
  page: false,
});

const sm = computed(() => quasar.screen.lt.sm);

const countLabel = computed(
  () => work.pagination.page + ' / ' + work.pagination.count
);

const updatePage = (name: LoadingNames) => {
  loading.value[name] = true;

  fetchSupportTicket('index', {
    category_id: work.selectedCategory?.id ?? -1,
    offset: work.pagination.offset,
    limit: 25,
  }).then(() => (loading.value[name] = false));
};

const setPage = () => {
  updatePage('page');
};

const nextPage = () => {
  work.pagination.page++;
  work.pagination.offset += 25;

  updatePage('next');
};

const prevPage = () => {
  work.pagination.page--;
  work.pagination.offset -= 25;

  updatePage('prev');
};

const lastPage = () => {
  work.pagination.page = 10;
  work.pagination.offset = 250;

  updatePage('last');
};

const firstPage = () => {
  work.pagination.page = 1;
  work.pagination.offset = 0;

  updatePage('first');
};

const leftArrows = computed(() => [
  {
    icon: mdiChevronDoubleLeft,
    action: firstPage,
    condition: work.pagination.page === 1,
    loading: loading.value.first,
  },
  {
    icon: 'chevron_left',
    action: prevPage,
    condition: work.pagination.page === 1,
    loading: loading.value.prev,
  },
]);

const rightArrows = computed(() => [
  {
    icon: 'chevron_right',
    action: nextPage,
    condition: work.pagination.page === work.pagination.count,
    loading: loading.value.next,
  },
  {
    icon: mdiChevronDoubleRight,
    action: lastPage,
    condition: work.pagination.page === work.pagination.count,
    loading: loading.value.last,
  },
]);

type LoadingNames = 'next' | 'prev' | 'last' | 'first' | 'page';
</script>

<style scoped lang="scss"></style>
