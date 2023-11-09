<template>
  <q-dialog
    persistent
    position="bottom"
    @before-show="updateShow"
    @hide="updateHide"
    @keydown="enterDown"
    v-model="states.dialogs.edit_button"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header :label="t('edit-button')"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          class="bott-input--rounded"
          :label="t('text-of-button')"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[() => text.required || t('warning-length')]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <select-type
          :webs="config.webs"
          :button="data.selectedButton"
          :types="inlineTypes"
          :buttons="inlineButtons"
          @update="update"
        ></select-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          flat
          no-caps
          class="rounded"
          size="md"
          :label="t('button-close')"
          color="primary"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          class="rounded"
          size="md"
          :label="t('button-save')"
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
import config from '../../../../config';
import {
  inlineTypes,
  inlineButtons,
} from 'src/modules/inline-menu/stores/buttons';

import { ref } from 'vue';

import { t } from 'src/boot/lang';
import { fetchButtons } from '../../../api';

import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

import SelectType from 'src/components/select-type/SelectType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const states = useStatesStore();
const data = useDataStore();

const loading = ref(false);

const state = ref<any>({
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
  loading.value = true;
  let message = data.selectedMessage;

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
      if (state.value.type === 5) {
        data.scenarioValue = response.data;
        return;
      }

      message!.inline_menu = response.data[0];
    }
  ).then(() => {
    loading.value = false;
    states.closeDialog('edit_button');
  });
};

const updateHide = () => {
  text.value.value = '';
  state.value.action = null;
};

const updateShow = () => {
  if (data.selectedButton === null) return;

  text.value.value = data.selectedButton.text;
  state.value.action = data.selectedButton?.action ?? '';
};
</script>
