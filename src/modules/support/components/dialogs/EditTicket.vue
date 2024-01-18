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

        <q-input
          v-model="desc"
          outlined
          counter
          autogrow
          :maxlength="512"
          label="Описание тикета"
          class="bott-input--rounded"
        />
      </q-card-section>

      <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
        <q-btn
          no-caps
          flat
          size="md"
          class="rounded"
          color="red"
          label="Закрыть"
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          color="primary"
          label="Сохранить"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { ref } from 'vue';

const support = useSupportStore();

const name = ref('');
const desc = ref('');

const updateShow = () => {
  name.value = support.selectedTicket?.name ?? '';
};
</script>

<style scoped lang="scss"></style>
