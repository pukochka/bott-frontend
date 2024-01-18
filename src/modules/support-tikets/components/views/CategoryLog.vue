<template>
  <div class="text-weight-bold text-center text-h6">
    Лог категории
    <span class="text-primary"> {{ work.selectedCategory?.title ?? '' }}</span>
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

  <q-card flat bordered class="q-mt-md" ref="table">
    <q-scroll-area :thumb-style="thumbStyle" :style="{ height: height + 'px' }">
      <div v-html="log" class="q-pa-sm"></div>
    </q-scroll-area>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { fetchSupportCategory } from '../../api/queries';

const work = useWorkStore();

const log = ref('');
const loading = ref(true);
const height = ref(300);
const table = ref();

const refreshLog = () => {
  loading.value = true;

  fetchSupportCategory(
    'log',
    { category_id: work.selectedCategory?.id ?? 0 },
    (response) => {
      log.value = response;
    }
  ).then(() => (loading.value = false));
};

onMounted(() => {
  height.value =
    window.innerHeight -
    30 -
    (table.value?.$el?.getBoundingClientRect().y ?? 300);
});

onBeforeMount(refreshLog);

const thumbStyle = {
  background: 'var(--q-primary)',
  margin: '2px',
  width: '6px',
};
</script>

<style scoped lang="scss"></style>
