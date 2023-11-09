<template>
  <q-breadcrumbs gutter="xs">
    <q-breadcrumbs-el
      v-for="([link, label], index) of breadcrumbs"
      :key="index"
      :label="label"
      :to="index !== breadcrumbs.length - 1 ? link : null"
      v-clickable="index !== breadcrumbs.length - 1"
      class="q-px-xs rounded"
    />
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useGlobalStore } from 'stores/data/globalStore';

const data = useGlobalStore();

const breadcrumbs = computed(() => Object.entries(data.breadcrumbs) ?? []);
</script>

<style lang="scss" scoped></style>
