<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="updateShow"
    v-model="commands.dialogs.add_scenario"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Добавить сценарий"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          label="Название сценария"
          hint="Название не должно повторяться"
          class="bott-input--rounded"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[
            () =>
              text.required ||
              'Введено неверное количество символов или название повторяется',
          ]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pb-sm">Тип первого сообщения</div>

        <update-type-list
          @select="update"
          :types="data.types"
        ></update-type-list>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          no-caps
          flat
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
          label="Добавить"
          color="primary"
          class="rounded"
          :disable="!text.required"
          :loading="loading"
          @click="addRoute"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { fetchCommands } from '../../../messages/api';
import { useCommandsStore } from '../../stores/commandsStore';
import { useDataStore } from '../../../messages/stores/data/dataStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import UpdateTypeList from 'src/components/meta/UpdateTypeList.vue';

const commands = useCommandsStore();
const data = useDataStore();

const loading = ref(false);
const selected = ref(0);

const update = (id: number) => {
  selected.value = id;
};

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return (
      this.max >= this.value.length &&
      this.min <= this.value.length &&
      commands.commands.filter((item) => item?.label === text.value.value)
        .length === 0
    );
  },
});

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) addRoute();
};

const addRoute = () => {
  loading.value = true;

  fetchCommands(
    'create-with-column',
    {
      message: text.value.value,
      message_type: selected.value,
    },
    (response) => {
      commands.commands.push(response.data.data);
    }
  ).then(() => {
    loading.value = false;
    commands.closeDialog('add_scenario');
  });
};

const updateShow = () => {
  text.value.value = '';
  selected.value = 0;
};
</script>
