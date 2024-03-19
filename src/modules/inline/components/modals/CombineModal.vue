<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="inline.dialogs.combine"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card flat bordered class="bott-dialog__responsive dialog-rounded">
        <dialog-header label="Совместить сообщение"></dialog-header>

        <q-card-section class="q-pt-none" style="min-height: 200px">
          <combine-pagination></combine-pagination>

          <q-inner-loading
            :showing="loading"
            class="bg-card"
            transition-show="none"
          >
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
          <q-btn
            flat
            no-caps
            class="rounded"
            size="md"
            label="Закрыть"
            color="primary"
            v-close-popup
          />

          <q-btn
            no-caps
            unelevated
            class="rounded"
            size="md"
            label="Добавить"
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { fetchUpdateMessages } from '../../api/queries';
import { useInlineStore } from '../../stores/inlineStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

import CombinePagination from '../combine/CombinePagination.vue';

const inline = useInlineStore();
const loading = ref(false);

const updateShow = () => {
  loading.value = true;
  fetchUpdateMessages(0).then(() => (loading.value = false));
};
</script>

<style scoped lang="scss"></style>
