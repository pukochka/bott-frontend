<template>
  <q-card flat bordered class="rounded fit">
    <q-card-section class="row items-center justify-between q-pa-sm">
      <div class="row items-center">
        <div class="bott__category-image bordered">
          <q-icon
            class="absolute-center"
            name="image"
            color="primary"
            size="20px"
          />

          <q-img
            src="url"
            spinner-color="primary"
            spinner-size="82px"
            fit="fill"
          />

          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            У категории есть картинка
          </q-tooltip>
        </div>

        <div class="text-h6">{{ category.label }}</div>
      </div>

      <div class="row q-gutter-x-sm">
        <q-btn
          v-for="(button, index) of categoryButtons"
          :key="index"
          flat
          padding="4px"
          size="md"
          color="primary"
          :icon="button.icon"
          class="rounded"
          @click="button.action(category)"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

    <products-list :products="category.products"></products-list>
  </q-card>
</template>

<script lang="ts" setup>
import { defaultControlCategory } from 'stores/defaults';

import ProductsList from './ProductsList.vue';

withDefaults(defineProps<CategoryItemProps>(), {
  category: () => defaultControlCategory,
});

const categoryButtons = [
  {
    label: 'Действия',
    icon: 'more_vert',
    action: (category: any) => (category.close = false),
  },
  {
    label: 'Редактировать',
    icon: 'edit',
    action: (category: any) => (category.close = false),
  },
  {
    label: 'Скрыть',
    icon: 'remove',
    action: (category: any) => (category.close = true),
  },
];

interface CategoryItemProps {
  category: any;
}
</script>

<style lang="scss" scoped>
.bott__category-image {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
