<template>
  <div
    class="row justify-center items-center"
    v-if="support.section === 'list' && support.tickets.length"
  >
    <div class="row q-pt-xs items-center justify-center">
      <div class="text-caption q-pr-sm text-center">
        <div class="">{{ rangeLabel }}</div>
      </div>

      <q-card
        flat
        bordered
        class="row rounded items-center no-wrap overflow-hidden"
      >
        <div class="" v-for="(button, index) of leftArrows" :key="index">
          <q-btn
            flat
            square
            no-wrap
            no-caps
            size="md"
            color="primary"
            :icon="button.icon"
            :loading="button.loading"
            :disable="button.condition"
            @click="button.action"
          />
        </div>

        <div class="">
          <q-btn
            flat
            square
            no-wrap
            no-caps
            size="md"
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
                    dense
                    flat
                    size="md"
                    color="primary"
                    class="rounded"
                    icon="check"
                    v-close-popup
                    @click="setPage"
                  />
                </template>
              </q-input>
            </q-menu>
          </q-btn>
        </div>

        <div class="" v-for="(button, index) of rightArrows" :key="index">
          <q-btn
            flat
            square
            no-wrap
            no-caps
            size="md"
            color="primary"
            :icon="button.icon"
            :loading="button.loading"
            :disable="button.condition"
            @click="button.action"
          />
        </div>
      </q-card>
    </div>

    <div class="text-caption q-pl-sm text-center">
      <div class="">Тикетов</div>
      <div class="">
        в категории
        <span class="text-primary">{{ support.pagination.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportTicket } from '../../api/queries';

import {
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
} from '@quasar/extras/mdi-v7';

const support = useSupportStore();

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
const rangeLabel = computed(
  () => support.pagination.offset + 1 + ' - ' + (support.pagination.offset + 25)
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
