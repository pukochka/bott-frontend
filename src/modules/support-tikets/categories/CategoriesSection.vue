<template>
  <div class="bott-page__subtitle">Ваши категории</div>

  <div class="row">
    <q-btn
      unelevated
      no-caps
      size="md"
      color="primary"
      class="col rounded"
      label="Добавить новую категорию"
    />
  </div>

  <div class="row q-col-gutter-sm">
    <category-question
      v-for="(category, index) of data.category"
      :key="index"
      :category="category"
    ></category-question>
  </div>

  <view-tickets></view-tickets>
</template>

<script lang="ts" setup>
import { useDataStore } from 'src/modules/support-tikets/categories/stores/dataStore';

import CategoryQuestion from './components/CategoryQuestion.vue';
import ViewTickets from './components/dialogs/ViewTickets.vue';

const data = useDataStore();
</script>

<style lang="scss" scoped></style>
