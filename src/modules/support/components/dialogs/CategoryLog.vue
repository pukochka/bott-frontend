<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.category_log"
    @before-show="updateShow"
  >
    <q-card bordered flat style="width: 100%" class="dialog-rounded">
      <dialog-header label="Лог категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-scroll-area style="width: 100%; height: 350px">
          <div v-html="log" class="q-pa-sm"></div>
        </q-scroll-area>

        <q-inner-loading :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { fetchSupportCategory } from '../../api/queries';

import { useSupportStore } from '../../stores/supportStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

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

const updateShow = () => {
  refreshLog();
};
</script>

<style scoped lang="scss"></style>
