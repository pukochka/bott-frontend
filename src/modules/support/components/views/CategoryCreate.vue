<template>
  <div class="q-gutter-y-sm q-py-lg">
    <div class="text-h6 text-center">Добавить категорию</div>

    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-xl-4">
        <q-input
          counter
          outlined
          label="Название новой категории"
          class="bott-input--rounded"
          :maxlength="48"
          :rules="[
            (val) => val.length >= 1 || 'Введено неверное количество символов',
          ]"
          v-model="text"
        />

        <div class="row justify-end q-gutter-x-sm q-pt-sm">
          <q-btn
            flat
            no-caps
            size="md"
            color="red"
            label="Отмена"
            class="rounded"
            @click="support.section = 'select'"
          />

          <q-btn
            unelevated
            no-caps
            size="md"
            color="primary"
            label="Добавить"
            class="rounded"
            :loading="loading"
            :disable="text.length < 1"
            @click="createCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportCategory, fetchSupportTicket } from '../../api/queries';

const support = useSupportStore();

const text = ref('');
const loading = ref(false);

const createCategory = () => {
  loading.value = true;

  fetchSupportCategory('create', { title: text.value }, (response) => {
    support.categories = response;
    support.selectedCategory =
      support.categories[support.categories.length - 1];

    fetchSupportTicket(
      'index',
      {
        category_id: support.selectedCategory?.id ?? -1,
        limit: support.pagination.limit,
        offset: 0,
      },
      () => {
        support.section = 'list';
      }
    ).then(() => (loading.value = false));
  });
};
</script>

<style scoped lang="scss"></style>
