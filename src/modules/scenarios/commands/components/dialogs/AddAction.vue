<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    v-model="commands.dialogs.add_action"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Добавить действие"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          class="bott-input--rounded"
          label="Название действия"
          hint="Название не должно повторяться"
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
        <action-menu
          index
          static
          :host="config.host"
          :bot_id="config.bot.id"
          :token="config.bot.token"
          @change="registerRoute"
        ></action-menu>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
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
          label="Добавить"
          color="primary"
          :disable="!text.required"
          :loading="loading"
          @click="addAction"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue';

import { fetchCommands } from '../../../messages/api';

import { useCommandsStore } from '../../stores/commandsStore';

import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import config from '../../../config';

const commands = useCommandsStore();

const loading = ref(false);

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return (
      this.max >= this.value.length &&
      this.min <= this.value.length &&
      commands.commands.filter((item) => item.label === text.value.value)
        .length === 0 &&
      route.value !== null
    );
  },
});

const route = ref<string | null>('');

function registerRoute(value: string | null) {
  route.value = value;
}

const addAction = () => {
  loading.value = true;

  fetchCommands('create', {
    message: text.value.value,
    route: route.value ?? '',
  }).then(() => {
    loading.value = false;
    commands.closeDialog('add_action');
  });
};

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) addAction();
};

onBeforeUpdate(() => {
  text.value.value = '';
});
</script>
