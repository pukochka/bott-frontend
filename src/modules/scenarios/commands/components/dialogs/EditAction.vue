<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="update"
    v-model="commands.dialogs.edit_action"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Изменение действия"></dialog-header>

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
          :route="route"
          :host="config.host"
          :bot_id="config.bot.id"
          :token="config.bot.token"
          :message_id="1"
          @change="registerRoute"
        ></action-menu>
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
          :disable="required"
          @click="editRoute"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { config } from '../../../config';

import { computed, ref } from 'vue';

import { fetchCommands } from '../../api/command';

import { useCommandsStore } from '../../stores/commandsStore';

import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const commands = useCommandsStore();

const route = ref<string | null>(null);
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
        .length === 0
    );
  },
});

const required = computed(() => route.value === null && !text.value.required);

function registerRoute(value: string | null) {
  route.value = value;
}

const editRoute = () => {
  loading.value = true;

  fetchCommands(
    'update-route',
    {
      route: route.value ?? '',
      message: text.value.value,
      route_id: commands.selectedCommand?.id ?? 0,
    },
    (response) => {
      commands.selectedCommand.route = response.data.data?.route ?? '';
      commands.selectedCommand.label = response.data.data?.label ?? '';
    }
  ).then(() => {
    loading.value = false;
    commands.closeDialog('edit_action');
  });
};

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && route.value !== null) editRoute();
};

const update = () => {
  route.value = commands.selectedCommand?.route ?? '';
  text.value.value = commands.selectedCommand?.label ?? '';
};
</script>
