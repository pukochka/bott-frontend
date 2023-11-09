<template>
  <q-dialog
    persistent
    position="bottom"
    @keydown="enterDown"
    @before-show="update"
    v-model="data.dialogs.edit_action"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header :label="t('edit-action')"></dialog-header>

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
          :rules="[() => text.required || t('notify-overlength-command')]"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <action-menu
          :route="route"
          :actions="config.routes"
          @change="registerRoute"
        ></action-menu>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-sm">
        <q-btn
          flat
          no-caps
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
          class="rounded"
          :label="t('button-save')"
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
import config from '../../../config';

import { computed, ref } from 'vue';
import { t } from 'src/boot/lang';
import { fetchCommands } from '../../api/command';

import { useDataStore } from '../../stores/dataStore';

import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const data = useDataStore();

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
      data.commands.filter((item) => item.label === text.value.value).length ===
        0
    );
  },
});

const required = computed(() => route.value === null && !text.value.required);

function registerRoute(value: string | null) {
  route.value = value;
}

const editRoute = () => {
  loading.value = true;

  Promise.all([
    fetchCommands('update-route', {
      route: route.value ?? '',
      route_id: data.selectedCommand?.id ?? 0,
    }),
    fetchCommands('update-message', {
      message: text.value.value,
      route_id: data.selectedCommand?.id ?? 0,
    }),
  ]).then(() => {
    loading.value = false;
    data.closeDialog('edit_action');
  });
};

const enterDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter' && route.value !== null) editRoute();
};

const update = () => {
  route.value = data.selectedCommand?.route ?? '';
  text.value.value = data.selectedCommand?.label ?? '';
};
</script>
