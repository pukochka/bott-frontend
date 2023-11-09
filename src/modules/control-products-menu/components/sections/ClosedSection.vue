<template>
  <div class="" v-if="data.closestCategories.length">
    <div class="row q-gutter-xs">
      <q-chip
        class="rounded bordered"
        :ripple="false"
        v-for="(category, index) of data.closestCategories"
        :key="index"
      >
        <div class="row items-center q-gutter-x-sm">
          <div class="">
            {{ category.label }}
          </div>

          <q-btn
            flat
            padding="2px"
            size="12px"
            color="primary"
            icon="add"
            class="rounded"
            @click="category.close = false"
          >
            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Открыть категорию
            </q-tooltip>
          </q-btn>
        </div>
      </q-chip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDataStore } from '../../stores/dataStore';

const data = useDataStore()
</script>

<style lang="scss" scoped></style>
