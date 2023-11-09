<template>
  <q-card
    flat
    bordered
    class="rounded relative-position q-gutter-y-sm q-pa-md"
    :id="'message_' + message.id"
    style="max-width: 370px; min-width: 370px"
  >
    <q-badge
      class="rounded q-mt-none cursor-pointer"
      v-if="message.active"
      floating
      v-ripple
    >
      <span class="text-weight-medium">{{ t('first-message') }}</span>

      <q-popup-proxy class="rounded bordered bott-portal-menu">
        <q-banner style="max-width: 200px">
          {{ t('notify-first-message') }}
        </q-banner>
      </q-popup-proxy>
    </q-badge>

    <div class="row no-wrap items-center q-mt-none q-gutter-x-sm">
      <q-btn
        flat
        size="12px"
        padding="2px"
        class="rounded cursor-move"
        icon="drag_indicator"
        color="primary"
        @mousedown="startDrag"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          {{ t('moving-squeeze') }}
        </q-tooltip>
      </q-btn>

      <edit-title :message="message"></edit-title>

      <q-space />

      <message-menu :message="message"></message-menu>
    </div>

    <message-main :message="message"></message-main>

    <message-buttons
      v-if="dragging === false"
      :message="message"
    ></message-buttons>

    <div v-if="message.type.id !== 2 && !dragging" class="row">
      <q-btn
        v-if="!message.inline_menu"
        flat
        no-caps
        color="primary"
        :label="t('add-buttons')"
        class="col rounded"
        :loading="loading"
        @click="addInlineMenu"
      />

      <q-btn
        v-else
        flat
        no-caps
        color="primary"
        :label="t('buttons-settings')"
        class="col rounded"
        @click="editButtons"
      />
    </div>

    <q-inner-loading
      @click="cancelConnection"
      :showing="cancelConnecting"
      class="flex flex-center q-mt-none rounded q-pa-md cancel-connection cursor-pointer"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Нажмите для отмены связи
      </q-tooltip>

      <div class="text-h6 text-center">{{ t('cancel-connection') }}</div>
    </q-inner-loading>

    <q-inner-loading
      :showing="isConnecting"
      @click="connect"
      class="flex flex-center q-mt-none rounded q-pa-md cursor-pointer"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        {{ t('click-connection') }}
      </q-tooltip>

      <div class="q-gutter-y-sm">
        <div class="row justify-center">
          <q-icon name="ads_click" size="32px" />
        </div>

        <div class="text-h6 text-center">
          {{ t('notify-to-connection') }}
        </div>
      </div>
    </q-inner-loading>

    <drag-horizontal
      floating
      :sort="index"
      :column_id="message.column_id"
      v-if="dragging === false && states.dragValue.el"
    ></drag-horizontal>
  </q-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from 'src/boot/lang';

import { fetchMessage, fetchButtons } from '../../api';

import { useVectorStore } from '../../stores/vector/vectorStore';
import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import { defaultMessage } from '../../stores/deafults';

import MessageMenu from './sections/MessageMenu.vue';
import MessageButtons from './sections/MessageButtons.vue';
import EditTitle from '../edit/EditTitle.vue';
import DragHorizontal from './sections/DragHorizontal.vue';
import MessageMain from './sections/MessageMain.vue';

const props = withDefaults(defineProps<MessageItemProps>(), {
  message: () => defaultMessage,
  index: () => 0,
  dragging: () => false,
});

const data = useDataStore();
const states = useStatesStore();
const vector = useVectorStore();

const loading = ref(false);

const isConnecting = computed(
  () => vector.connection && vector.mountedLine?.message_id !== props.message.id
);

const cancelConnecting = computed(
  () => vector.connection && vector.mountedLine?.message_id === props.message.id
);

const startDrag = (e: MouseEvent) => {
  states.startDrag(e, props.message);
};

const cancelConnection = () => {
  vector.linesValue.pop();

  vector.mountedLine = null;
};

const connect = () => {
  vector.endMove(props.message.id);

  fetchButtons(
    'update-data-and-type',
    {
      id: data.selectedButton?.id ?? 0,
      text: data.selectedButton?.text ?? '',
      action: props.message.id.toString(),
      type: 5,
    },
    (response) => {
      data.scenarioValue = response.data;
    }
  );
};

const addInlineMenu = () => {
  loading.value = true;
  let message = props.message;

  fetchMessage(
    'add-inline-menu',
    { message_id: props.message.id },
    (response) => {
      message.inline_menu = response.data?.data?.inline_menu ?? null;
    }
  ).then(() => (loading.value = false));
};

const editButtons = () => {
  data.selectedMessage = props.message;

  states.openDialog('settings_button');
};

interface MessageItemProps {
  message: SCMessage;
  dragging?: boolean;
  index?: number;
}
</script>
<style lang="scss">
.cancel-connection {
  background: rgba(255, 0, 0, 0.3);
}
</style>
