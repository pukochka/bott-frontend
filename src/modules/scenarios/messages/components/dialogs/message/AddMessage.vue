<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="EnterDown"
    @before-show="updateShow"
    v-model="states.dialogs.add_message"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Выберите тип сообщения"></dialog-header>

      <q-card-section class="q-pt-none">
        <edit-type @select="update"></edit-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
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
          :loading="loading"
          @click="AddMessage"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { fetchColumn } from '../../../api';

import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import EditType from '../../edit/EditType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const states = useStatesStore();
const data = useDataStore();

const loading = ref(false);

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter') AddMessage();
};

const selected = ref(0);

const update = (id: number) => {
  selected.value = id;
};

const AddMessage = () => {
  loading.value = true;

  if (data.selectedColumn === null) {
    fetchColumn('create', {
      route_id: data.scenarioValue?.id ?? 0,
      message_type: selected.value,
    }).then(() => {
      loading.value = false;
      states.closeDialog('add_message');
    });
  } else {
    fetchColumn('add-message-in-column', {
      route_id: data.scenarioValue?.id ?? 0,
      column_id: data.selectedColumn.id,
      message_type: selected.value,
    }).then(() => {
      loading.value = false;
      states.closeDialog('add_message');
    });
  }
};

const updateShow = () => {
  selected.value = 0;
};
</script>
<style lang="scss"></style>
