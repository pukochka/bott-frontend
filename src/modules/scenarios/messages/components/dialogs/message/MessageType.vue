<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="updateShow"
    v-model="states.dialogs.change_type"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Изменить тип сообщения"></dialog-header>

      <q-card-section class="q-pt-none">
        <edit-type @select="update" :message-type="selected"></edit-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          flat
          no-caps
          size="md"
          class="rounded"
          label="Закрыть"
          color="primary"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          class="rounded"
          label="Сохранить"
          color="primary"
          :loading="loading"
          @click="changeType"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { fetchMessage } from '../../../api';

import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import EditType from '../../edit/EditType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const states = useStatesStore();
const data = useDataStore();

const selected = ref(0);
const loading = ref(false);

const update = (id: number) => (selected.value = id);

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter') changeType();
};

const updateShow = () => {
  selected.value = data.selectedMessage?.type?.id ?? 0;
};

const changeType = () => {
  loading.value = true;
  let message = data.selectedMessage;

  fetchMessage(
    'update-type',
    {
      message_id: data.selectedMessage?.id ?? 0,
      type: selected.value,
    },
    (response) => {
      Object.assign(message, response.data.data);
    }
  ).then(() => {
    loading.value = false;
    states.closeDialog('change_type');
  });
};
</script>
