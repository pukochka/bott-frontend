<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="states.dialogs.settings_button"
  >
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <dialog-header :label="t('settings-buttons')"></dialog-header>

        <q-card-section class="q-py-md">
          <div
            class="text-center text-grey text-h6"
            v-if="menu.lines?.length === 0"
          >
            Кнопок пока нет
          </div>

          <buttons-section
            :menu="menu"
            @add-button="addButton"
            @select="select"
            @delete="deleteLine"
          ></buttons-section>
        </q-card-section>

        <q-card-section class="row q-col-gutter-sm">
          <div
            class="col-12 col-sm-6"
            v-for="(button, index) of buttons"
            :key="index"
          >
            <q-btn
              outline
              no-caps
              padding="4px"
              class="rounded fit"
              :label="button.label"
              :color="button.color"
              :loading="button.loading"
              @click="button.action"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { t } from 'src/boot/lang';
import { useStatesStore } from '../../../stores/states/statesStore';

import ButtonsSection from '../../../../../../components/inline/ButtonsSection.vue';
import DialogHeader from '../../../../../../components/dialogs-sections/DialogHeader.vue';
import { useDataStore } from '../../../stores/data/dataStore';
import { useDialog } from '../../../../../../utils/use/useDialog';
import { fetchMessage } from '../../../api';

const states = useStatesStore();
const data = useDataStore();

const loading = ref(false);

const menu = computed(() => data.selectedMessage?.menu ?? { id: 0, lines: [] });

const select = (button: IMButton) => {
  data.selectedButton = button;

  states.openDialog('edit_button');
};

const addButton = (id?: number) => {
  data.selectedLine = id ?? null;

  states.openDialog('add_button');
};

const deleteLine = (id: number) => {
  data.selectedLine = id;

  useDialog(t('notify-delete-line'));
};

const deleteMenu = () => {
  let message = data.selectedMessage;
  useDialog(t('notify-delete-menu'), true).onOk(() => {
    states.closeDialog('settings_button');
    fetchMessage(
      'delete-inline-menu',
      {
        message_id: data.selectedMessage?.id ?? 0,
      },
      () => {
        message!.menu = null;
      }
    );
  });
};

const buttons = computed(() => [
  {
    label: t('add-button-line'),
    color: 'primary',
    action: () => addButton(),
    loading: false,
  },
  {
    label: t('location-buttons'),
    color: 'primary',
    action: () => states.openDialog('draggable'),
    loading: false,
  },
  {
    label: t('delete-menu'),
    color: 'red',
    action: () => deleteMenu(),
    loading: loading.value,
  },
  {
    label: t('button-close'),
    color: 'primary',
    action: () => states.closeDialog('settings_button'),
    loading: false,
  },
]);
</script>
