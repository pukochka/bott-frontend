<template>
  <div class="bott-page__subtitle">Добавить новую категорию</div>

  <append-section></append-section>

  <div class="row justify-between items-center">
    <div class="bott-page__subtitle">Категории</div>

    <div class="row items-center q-gutter-x-sm">
      <q-btn
        flat
        dense
        size="md"
        color="primary"
        class="rounded"
        v-for="(button, index) of classes"
        :key="index"
        :icon="button.icon"
        @click="data.selectedLayout = index"
      />
    </div>
  </div>

  <closed-section></closed-section>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div
        class="transition"
        :class="classes[data.selectedLayout].class"
        v-for="(category, index) of data.notClosestCategories"
        :key="index"
      >
        <category-item :category="category"></category-item>
      </div>
    </div>
  </div>

  <div class="" v-for="(info, index) of categoriesInfo" :key="index">
    <div class="q-pa-lg flex-center flex text-h6" v-if="info.condition">
      <div class="column items-center">
        <q-icon :name="info.icon" color="primary" size="32px" />

        <div class="">{{ info.label }}</div>

        <div class="bott-text__caption">{{ info.caption }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useDataStore } from './stores/dataStore';

import CategoryItem from './components/CategoryItem.vue';
import ClosedSection from './components/sections/ClosedSection.vue';
import AppendSection from './components/sections/AppendSection.vue';

import {
  mdiEmoticonSadOutline,
  mdiFolderHidden,
  mdiViewAgenda,
  mdiViewModule,
} from '@quasar/extras/mdi-v7';

const data = useDataStore();

const classes = [
  {
    icon: mdiViewAgenda,
    class: ' col-12',
  },
  {
    icon: mdiViewModule,
    class: ' col-12 col-sm-6',
  },
];

const categoriesInfo = computed(() => [
  {
    label: 'Все категории скрыты',
    icon: mdiFolderHidden,
    condition: !data.notClosestCategories.length && data.categories.length,
    caption: 'Чтобы управлять категорией, откройте её',
  },
  {
    label: 'У Вас пока что нет категорий',
    icon: mdiEmoticonSadOutline,
    condition: !data.categories.length,
    caption: 'Для управления категорией добавьте категорию',
  },
]);
</script>

<style lang="scss" scoped></style>
