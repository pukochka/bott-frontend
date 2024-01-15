<template>
  <div
    class="row justify-center items-center"
    v-if="work.section === 'list' && work.selectedCategory"
  >
    <div class="row q-pt-xs">
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

const quasar = useQuasar();
const work = useWorkStore();

const search = ref('');

const sm = computed(() => quasar.screen.lt.sm);

const countLabel = computed(
  () => work.pagination.page + ' / ' + work.pagination.count
);

const nextPage = () => {
  console.log(1);
};

const prevPage = () => {
  console.log(1);
};

const lastPage = () => {
  console.log(1);
};

const firstPage = () => {
  console.log(1);
};

const leftArrows = computed(() => [
  {
    icon: mdiChevronDoubleLeft,
    action: firstPage,
    condition: work.pagination.page === 1,
  },
  {
    icon: 'chevron_left',
    action: prevPage,
    condition: work.pagination.page === 1,
  },
]);

const rightArrows = computed(() => [
  {
    icon: 'chevron_right',
    action: nextPage,
    condition: work.pagination.page === work.pagination.count,
  },
  {
    icon: mdiChevronDoubleRight,
    action: lastPage,
    condition: work.pagination.page === work.pagination.count,
  },
]);
</script>

<style scoped lang="scss"></style>
