<template>
  <div class="col-12 q-px-md">
    <div class="" v-if="md">
      <div class="row q-pb-xs bott-btn__outline">
        <q-btn
          outline
          no-wrap
          no-caps
          size="md"
          color="primary"
          :label="work.selectedCategory?.title ?? 'Выбрать категорию'"
          class="rounded-top col"
          @click="work.openDialog('select_category')"
        />
      </div>
    </div>

    <div class="row items-center" v-else>
      <q-separator vertical inset class="q-mx-sm" />

      <q-scroll-area
        visible
        style="height: 32px"
        class="col"
        :thumb-style="thumbStyle"
      >
        <div class="row no-wrap">
          <div
            class="row items-center no-wrap rounded-top overflow-hidden transition"
            v-for="category of work.categories"
            :key="category.id"
            style="max-width: 170px; min-width: 170px"
            :class="[
              work.selectedCategory?.id === category.id
                ? ' bg-primary text-white'
                : '',
            ]"
          >
            <q-btn
              flat
              no-caps
              no-wrap
              square
              class="fit"
              padding="4px 12px"
              @click="selectCategory(category)"
            >
              <div class="text-weight-bold ellipsis">{{ category.title }}</div>
            </q-btn>

            <q-separator vertical class="q-my-xs" />
          </div>
        </div>
      </q-scroll-area>

      <q-btn
        flat
        icon="add"
        color="primary"
        padding="4px"
        class="rounded q-ml-sm"
        @click="createCategory"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Добавить категорию
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { fetchSupportTicket } from '../../api/queries';

const work = useWorkStore();
const quasar = useQuasar();

const md = computed(() => quasar.screen.lt.md);

const selectCategory = (category: SupportCategory) => {
  work.loading.category = true;

  work.tickets = [];
  work.section = 'list';
  work.selectedCategory = category;

  fetchSupportTicket(
    'index',
    {
      category_id: category.id,
      offset: 25,
      limit: 25,
    },
    (response) => {
      work.tickets = response;
    }
  ).then(() => {
    work.loading.category = false;
  });
};

const createCategory = () => {
  work.selectedCategory = null;
  work.section = 'create';
};

const color = [
  '#c1121f',
  '#fca311',
  '#588157',
  '#a98467',
  '#7209b7',
  '#619b8a',
  '#f9844a',
  '#6d597a',
  '#ffc9b9',
  '#4c956c',
  '#4c8fa2',
  '#dff71d',
];

const thumbStyle = {
  height: '4px',
  margin: '2px',
  background: 'var(--q-primary)',
};
</script>

<style scoped lang="scss">
.rounded-top {
  border-radius: 10px 10px 0 0;
}
</style>
