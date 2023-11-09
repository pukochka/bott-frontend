<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="updateShow"
    v-model="states.dialogs.edit_label"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header :label="t('edit-label')"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          class="bott-input--rounded"
          :label="t('scenario-name')"
          :hint="t('command-notrepeat')"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[() => text.required || t('warning-length')]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          flat
          no-caps
          class="rounded"
          :label="t('button-close')"
          color="primary"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          class="rounded"
          :label="t('button-save')"
          color="primary"
          :loading="loading"
          :disable="!text.required"
          @click="editLabel"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { t } from 'src/boot/lang';

import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import { fetchCommands } from '../../api';

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

const editLabel = () => {
  loading.value = true;

  fetchCommands('update-message', {
    message: text.value.value,
    route_id: data.scenarioValue?.id ?? 0,
  }).then(() => {
    loading.value = false;
    states.closeDialog('edit_label');
  });
};

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) editLabel();
};

const updateShow = () => {
  text.value.value = data.scenarioValue?.label ?? '';
};
</script>

<style lang="scss" scoped></style>
