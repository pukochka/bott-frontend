<template>
  <div class="text-weight-bold text-center text-h6">
    Лог категории
    <span class="text-primary">
      {{ support.selectedCategory?.title ?? '' }}
    </span>
  </div>

  <div class="row justify-center q-pt-sm">
    <q-btn
      flat
      no-caps
      size="md"
      color="primary"
      class="rounded"
      label="Обновить"
      @click="refreshLog"
    />
  </div>

  <q-card flat bordered class="q-mt-md rounded overflow-hidden" ref="table">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :style="{ height: `calc(100vh - 250px - ${support.offsetTop}px)` }"
    >
      <div v-html="log" class="q-pa-sm"></div>
    </q-scroll-area>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportCategory } from '../../api/queries';

const support = useSupportStore();

const log = ref('');
const loading = ref(true);

const refreshLog = () => {
  loading.value = true;

  fetchSupportCategory(
    'log',
    { category_id: support.selectedCategory?.id ?? 0 },
    (response) => {
      log.value = response;
    }
  ).then(() => (loading.value = false));
};

onBeforeMount(refreshLog);

const thumbStyle = {
  background: 'var(--q-primary)',
  margin: '2px',
  width: '6px',
};
</script>

<style scoped lang="scss"></style>
