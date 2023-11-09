<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="updateShow"
    v-model="data.dialogs.add_scenario"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header :label="t('add-scenario')"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          :label="t('scenario-name')"
          :hint="t('command-notrepeat')"
          class="bott-input--rounded"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[() => text.required || t('notify-overlength-command')]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pb-sm">{{ t('type-of-first-message') }}</div>

        <edit-type @select="update"></edit-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          no-caps
          flat
          size="md"
          class="rounded"
          :label="t('button-close')"
          color="primary"
          v-close-popup
        />

        <q-btn
          no-caps
          unelevated
          size="md"
          :label="t('button-add')"
          color="primary"
          class="rounded"
          :disable="!text.required"
          :loading="loading"
          @click="AddRoute"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { t } from 'src/boot/lang';

import { fetchCommands } from '../../../messages/api';

import { useDataStore } from '../../stores/dataStore';

import EditType from '../../../messages/components/edit/EditType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

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
      data.commands.filter((item) => item.label === text.value.value).length ===
        0
    );
  },
});

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && text.value.required) addRoute();
};

const addRoute = () => {
  loading.value = true;

  fetchCommands('create-with-column', {
    message: text.value.value,
    message_type: selected.value,
  }).then(() => {
    loading.value = false;
    data.closeDialog('add_scenario');
  });
};

const updateShow = () => {
  text.value.value = '';
  selected.value = 0;
};
</script>
