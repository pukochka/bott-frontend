<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="EnterDown"
    @before-show="update"
    v-model="states.dialogs.add_button"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header :label="t('add-button')"></dialog-header>

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

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
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
          unelevated
          no-caps
          class="rounded"
          size="md"
          :label="t('button-add')"
          color="primary"
          :disable="!text.required"
          :loading="loading"
          @click="AddButton"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { t } from 'src/boot/lang';
import { fetchButtons } from '../../../api';

import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const states = useStatesStore();
const data = useDataStore();

const loading = ref(false);

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const AddButton = () => {
  loading.value = true;
  let message = data.selectedMessage;

  if (data.selectedLine === null) {
    fetchButtons(
      'add-button-with-line',
      {
        text: text.value.value,
        type: 6,
        action: 'free',
      },
      (response) => {
        message!.inline_menu = response.data[0];
      }
    ).then(() => {
      loading.value = false;
      states.closeDialog('add_button');
    });
  } else {
    fetchButtons(
      'add-button-in-line',
      {
        text: text.value.value,
        type: 6,
        action: 'free',
        line_id: data.selectedLine,
      },
      (response) => {
        message!.inline_menu = response.data[0];
      }
    ).then(() => {
      loading.value = false;
      states.closeDialog('add_button');
    });
  }
};

const update = () => {
  text.value.value = '';
};

const EnterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) AddButton();
};
</script>
