<template>
  <q-table
    flat
    title="Пользователи"
    :rows="config.table.columns"
    :columns="[]"
    row-key="name"
    color="amber"
    card-class="bg-transparent"
  >
    <template #bottom></template>
  </q-table>
</template>

<script setup lang="ts">
import { config } from './config';
</script>

<style scoped lang="scss"></style>
