<template>
  <div class="col-12">
    <div class="q-px-md" v-if="md">
      <div class="row q-pb-xs">
        <q-btn
          outline
          no-wrap
          no-caps
          size="md"
          color="primary"
          :label="work.selectedCategory?.label ?? 'Выбрать категорию'"
          class="rounded-top col"
          @click="work.openDialog('select_category')"
        />
      </div>
    </div>

    <div class="row items-center" v-else>
      <q-separator vertical inset class="q-mx-sm" />

      <div
        class="row items-center no-wrap rounded-top overflow-hidden transition col"
        v-for="category of work.categories"
        :key="category.id"
        style="max-width: 200px"
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
          <div class="text-weight-bold ellipsis">{{ category.label }}</div>
        </q-btn>

        <q-separator vertical class="q-my-xs" />
      </div>

      <div class="col">
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
  </div>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const work = useWorkStore();
const quasar = useQuasar();

const md = computed(() => quasar.screen.lt.md);

const selectCategory = (category: any) => {
  work.selectedCategory = category;
  work.section = 'list';
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
</script>

<style scoped lang="scss">
.rounded-top {
  border-radius: 10px 10px 0 0;
}
</style>
