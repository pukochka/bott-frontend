<template>
  <div
    class="row no-wrap items-center"
    v-if="support.pagination.count > 25 && !support.loading.category"
  >
    <q-btn
      v-for="(button, index) of leftArrows"
      :key="index"
      flat
      square
      no-wrap
      no-caps
      size="md"
      class="col"
      color="primary"
      :icon="button.icon"
      :loading="button.loading"
      :disable="button.condition"
      @click="button.action"
    />

    <q-btn
      flat
      square
      no-wrap
      no-caps
      size="md"
      class="col"
      :label="countLabel"
      :loading="loading.page"
      :disable="pagesCount === 1"
    >
      <q-menu cover class="bott-portal-menu">
        <q-input
          autofocus
          outlined
          style="min-width: 200px"
          mask="####"
          label="Введите номер страницы"
          class="bott-input--rounded"
          v-model="search"
        >
          <template #append>
            <q-btn
              v-close-popup
              dense
              flat
              size="md"
              icon="check"
              color="primary"
              class="rounded"
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
      class="col"
      color="primary"
      :icon="button.icon"
      :loading="button.loading"
      :disable="button.condition"
      @click="button.action"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { fetchSupportTicket } from '../../api/queries';

import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
} from '@quasar/extras/mdi-v7';

const search = ref('');
const loading = ref<Record<LoadingNames, boolean>>({
  next: false,
  prev: false,
  last: false,
  first: false,
  page: false,
});

const pagesCount = computed(() => {
  const count = Math.ceil(support.pagination.count / support.pagination.limit);

  return count !== 0 ? count : 1;
});
const countLabel = computed(
  () => support.pagination.page + ' / ' + pagesCount.value
);

const updatePage = (name: LoadingNames) => {
  loading.value[name] = true;

  fetchSupportTicket('index', {
    category_id: support.selectedCategory?.id ?? -1,
    offset: support.pagination.offset,
    limit: support.pagination.limit,
  }).then(() => (loading.value[name] = false));
};

const setPage = () => {
  const page = Number(search.value);

  if (isNaN(page) || page > pagesCount.value || page === 0) return;

  support.pagination.page = page;
  support.pagination.offset =
    page * support.pagination.limit - support.pagination.limit;

  updatePage('page');
};

const nextPage = () => {
  support.pagination.page++;
  support.pagination.offset += support.pagination.limit;

  updatePage('next');
};

const prevPage = () => {
  support.pagination.page--;
  support.pagination.offset -= support.pagination.limit;

  updatePage('prev');
};

const lastPage = () => {
  support.pagination.page = pagesCount.value;
  support.pagination.offset =
    Math.floor(support.pagination.count / support.pagination.limit) *
    support.pagination.limit;

  updatePage('last');
};

const firstPage = () => {
  support.pagination.page = 1;
  support.pagination.offset = 0;

  updatePage('first');
};

const leftArrows = computed(() => [
  {
    icon: mdiChevronDoubleLeft,
    action: firstPage,
    condition: support.pagination.page === 1,
    loading: loading.value.first,
  },
  {
    icon: 'chevron_left',
    action: prevPage,
    condition: support.pagination.page === 1,
    loading: loading.value.prev,
  },
]);

const rightArrows = computed(() => [
  {
    icon: 'chevron_right',
    action: nextPage,
    condition: support.pagination.page === pagesCount.value,
    loading: loading.value.next,
  },
  {
    icon: mdiChevronDoubleRight,
    action: lastPage,
    condition: support.pagination.page === pagesCount.value,
    loading: loading.value.last,
  },
]);

type LoadingNames = 'next' | 'prev' | 'last' | 'first' | 'page';
</script>

<style scoped lang="scss"></style>
