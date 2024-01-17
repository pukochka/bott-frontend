<template>
  <div class="text-weight-bold text-center text-h6">
    Лог категории
    <span class="text-primary"> {{ work.selectedCategory?.title ?? '' }}</span>
  </div>

  <q-card flat bordered class="q-mt-md">
    <q-scroll-area style="height: 350px">
      <div v-html="log"></div>
    </q-scroll-area>
  </q-card>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import { onBeforeMount, ref } from 'vue';
import { fetchSupportCategory } from '../../api/queries';

const work = useWorkStore();

const log = ref('');

onBeforeMount(() => {
  fetchSupportCategory(
    'log',
    { category_id: work.selectedCategory?.id ?? 0 },
    (response) => {
      log.value = response;
    }
  );
});
</script>

<style scoped lang="scss"></style>
