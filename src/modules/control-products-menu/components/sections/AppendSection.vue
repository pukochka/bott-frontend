<template>
  <div class="">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-8">
        <q-input
          class="bott-input--rounded fit"
          v-model="text"
          label="Заголовок новой категории"
          outlined
          dense
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          unelevated
          no-caps
          size="md"
          color="primary"
          icon="add"
          label="Добавить категорию"
          class="fit rounded"
        />
      </div>

      <div class="col-12 col-sm-6">
        <ul class="bott-list bott-text text-size-13">
          <li class="bott-text__link inline-block">Как добавить товары?</li>

          <li class="bott-text__link inline-block">
            Как изменить дизайн товара, формат выбора количества или внешний вид
            чека?
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('');
</script>

<style lang="scss" scoped></style>
