<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.category_add"
    @before-show="updateShow"
  >
    <q-card bordered flat style="width: 100%" class="dialog-rounded">
      <dialog-header label="Добавление категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="text"
          outlined
          counter
          :maxlength="32"
          label="Название категори"
          class="bott-input--rounded"
        />
      </q-card-section>

      <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
        <q-btn
          no-caps
          flat
          size="md"
          class="rounded"
          color="primary"
          label="Закрыть"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          color="primary"
          label="Добавить"
          :loading="loading"
          :disable="text.length > 64 || text.length < 1"
          @click="createCategory"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { ref } from 'vue';
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

    fetchSupportTicket('index', {
      category_id: support.selectedCategory?.id ?? -1,
      limit: support.pagination.limit,
      offset: 0,
    }).then(() => (loading.value = false));
  });
};

const updateShow = () => {
  text.value = '';
};
</script>

<style scoped lang="scss"></style>
