<template>
  <q-dialog
    persistent
    position="bottom"
    @before-show="initState"
    @hide="destroyState"
    @keydown="enterDown"
    v-model="states.dialogs.edit_button"
  >
    <q-card bordered flat style="width: 100%" class="dialog-rounded">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Изменение кнопки</q-toolbar-title>

        <q-btn
          flat
          round
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-input
          class="bott-input--rounded"
          autofocus
          counter
          outlined
          label="Текст кнопки"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[
            () => text.required || 'Введено неверное количество символов',
          ]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <select-type
          :host="config.host"
          :token="config.bot.token"
          :bot_id="config.bot.id"
          :webs="config.webs"
          :types="inlineTypes"
          :buttons="inlineButtons"
          :button="data.selectedButton"
          :message_id="data.selectedMessage?.id ?? 0"
          @update="update"
        ></select-type>
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
          unelevated
          no-caps
          class="rounded"
          size="md"
          label="Сохранить"
          color="primary"
          :disable="!text.required"
          :loading="loading"
          @click="editButton"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import config from '../../../config';

import { ref } from 'vue';
import { fetchButtons } from '../../api';

import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import SelectType from 'src/components/select-type/SelectType.vue';
import {
  inlineButtons,
  inlineTypes,
} from '../../../../inline-menu/stores/buttons';

const states = useStatesStore();
const data = useDataStore();

const loading = ref(false);

const state: any = ref({
  action: null,
  type: -1,
});

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return (
      this.max > this.value.length &&
      this.min < this.value.length &&
      state.value.action !== null
    );
  },
});

const update = (value: any) => (state.value = value);

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) editButton();
};

const editButton = () => {
  const message = data.selectedMessage;
  loading.value = true;

  const currentAction =
    state.value.type === 5
      ? new URL('https://' + state.value.action).searchParams.get('id')
      : state.value.action;

  fetchButtons(
    'update-data-and-type',
    {
      type: state.value.type,
      action: currentAction ?? '',
      text: text.value.value,
      id: data.selectedButton?.id ?? 0,
    },
    (response) => {
      if ([5, 6].includes(state.value.type)) {
        data.scenarioValue = response.data.data;

        return;
      }

      message!.menu = response.data.data;
    }
  ).then(() => {
    loading.value = false;
    states.closeDialog('edit_button');
  });
};

const initState = () => {
  if (data.selectedButton === null) return;

  text.value.value = data.selectedButton.text;
  state.value.action = data.selectedButton.action ?? null;
};

const destroyState = () => {
  text.value.value = '';
  state.value.action = null;
};
</script>
