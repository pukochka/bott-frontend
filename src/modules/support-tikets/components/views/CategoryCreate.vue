<template>
  <div class="q-gutter-y-sm q-pa-lg">
    <div class="text-h6 text-center">Добавить категорию</div>

    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-xl-4">
        <q-input
          dense
          v-model="text"
          label="Название новой категории"
          outlined
          class="bott-input--rounded"
        />

        <div class="row justify-end q-gutter-x-sm q-pt-sm">
          <q-btn
            flat
            no-caps
            size="md"
            color="red"
            label="Отмена"
            class="rounded"
            @click="work.section = 'select'"
          />

          <q-btn
            unelevated
            no-caps
            size="md"
            color="primary"
            label="Добавить"
            class="rounded"
            :loading="loading"
            @click="createCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkStore } from '../../stores/workStore';
import { fetchSupportCategory, fetchSupportTicket } from '../../api/queries';

const work = useWorkStore();

const text = ref('');
const loading = ref(false);

const createCategory = () => {
  loading.value = true;

  fetchSupportCategory('create', { title: text.value }, (response) => {
    work.categories = response;
    work.selectedCategory = work.categories[work.categories.length - 1];

    fetchSupportTicket(
      'index',
      { category_id: work.selectedCategory?.id ?? -1, limit: 25, offset: 25 },
      () => {
        work.section = 'list';
      }
    ).then(() => (loading.value = false));
  });
};
</script>

<style scoped lang="scss"></style>
