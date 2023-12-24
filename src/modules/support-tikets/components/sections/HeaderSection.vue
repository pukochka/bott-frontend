<template>
  <div class="row items-stretch q-mx-md">
    <q-separator vertical inset class="q-mx-sm" />

    <div
      class="row items-center rounded-top overflow-hidden transition"
      v-for="category of work.categories"
      :key="category.id"
      :class="[work.selectedCategory?.id === category.id ? ' bg-blue-3' : '']"
    >
      <div class="row items-center">
        <q-btn
          flat
          no-caps
          square
          padding="4px 12px"
          @click="selectCategory(category)"
        >
          <div class="text-weight-bold">{{ category.label }}</div>
        </q-btn>
      </div>

      <q-separator vertical class="q-my-xs" />
    </div>

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
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';

const work = useWorkStore();

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

<style scoped lang="scss"></style>
