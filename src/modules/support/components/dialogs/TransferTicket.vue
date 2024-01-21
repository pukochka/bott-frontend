<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.transfer_ticket"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-list bordered separator class="rounded overflow-hidden">
          <q-item tag="label" v-for="category of categories" :key="category.id">
            <q-item-section class="text-body1">
              {{ category.title }}
            </q-item-section>

            <q-item-section avatar>
              <q-checkbox
                @update:model-value="selected = category.id"
                :model-value="selected === category.id"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
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
          label="Переместить"
          :disable="selected === 0"
          :loading="loading"
          @click="transferTicket"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { fetchSupportTicket } from '../../api/queries';
import { config } from '../../config';

const support = useSupportStore();

const selected = ref(0);
const loading = ref(false);

const categories = computed(() =>
  support.categories.filter((item) => item.id !== support.selectedCategory?.id)
);

const transferTicket = () => {
  loading.value = true;
  fetchSupportTicket('move-category', {
    category_id: selected.value,
    ticket_id: support.selectedTicket?.id ?? -1,
    user_id: config.user_id,
  }).then(() => {
    support
      .updateCategory(support.selectedCategory?.id ?? -1)
      .then(() => (loading.value = false));
  });
};
</script>

<style scoped lang="scss"></style>
