<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.edit_ticket"
    @before-show="updateShow"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Настройки тикета"></dialog-header>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <q-input
          v-model="name"
          outlined
          counter
          :maxlength="64"
          label="Название тикета"
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
          label="Сохранить"
          :loading="loading"
          :disable="name.length > 64 || name.length < 1"
          @click="updateTicket"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { ref } from 'vue';
import { fetchSupportTicket } from '../../api/queries';

const support = useSupportStore();

const name = ref('');
const loading = ref(false);

const updateTicket = () => {
  loading.value = true;
  fetchSupportTicket(
    'update-title',
    {
      ticket_id: support.selectedTicket?.id ?? -1,
      title: name.value,
    },
    (response) => {
      if (support.selectedTicket) {
        support.selectedTicket.title = response;
      }
    }
  ).then(() => {
    support.updateCategory(support.selectedCategory?.id ?? -1).then(() => {
      loading.value = false;
      support.closeDialog('edit_ticket');
    });
  });
};

const updateShow = () => {
  name.value = support.selectedTicket?.title ?? '';
};
</script>

<style scoped lang="scss"></style>
