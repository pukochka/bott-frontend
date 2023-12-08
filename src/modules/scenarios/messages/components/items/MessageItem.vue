<template>
  <q-card
    flat
    bordered
    class="rounded relative-position q-gutter-y-sm q-pa-sm"
    :id="'message_' + message.id"
    style="max-width: 370px; min-width: 370px"
  >
    <q-badge
      class="rounded q-mt-none cursor-pointer first-message--banner q-pa-xs"
      v-if="message.active"
      v-ripple
    >
      <span class="text-weight-medium">Начальное сообщение</span>

      <q-popup-proxy class="rounded bordered bott-portal-menu">
        <q-banner style="max-width: 200px">
          Это первое сообщение, которое бот пришлет пользователю.
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
          Зажмите, для перемещения
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

    <div class="row items-center">
      <q-btn
        v-if="props.message.type.id === 2"
        flat
        dense
        no-caps
        :href="`/lk/common/messages/feedback/view?bot_id=${config.bot.id}&id=${props.message.id}`"
        padding="4px"
        class="rounded col"
        color="primary"
        label="Изменить обратную связь"
      />

      <q-btn
        v-else
        flat
        dense
        no-caps
        padding="4px"
        class="rounded col"
        color="primary"
        label="Изменить сообщение"
        @click="openMessage"
      />
    </div>

    <message-shadow
      @click="cancelConnection"
      :showing="cancelConnecting"
      label="Отменить связь"
      icon="close"
      class="cancel-connection"
      tooltip="Нажмите для отмены связи"
    ></message-shadow>

    <message-shadow
      @click="connect"
      :showing="isConnecting"
      label="Наведите на блок и нажмите на него для связи"
      icon="ads_click"
      class="add-connection"
      tooltip="Нажмите для связи"
    ></message-shadow>

    <drag-horizontal
      floating
      :sort="index ?? 0"
      :column_id="message?.column_id ?? 0"
      v-if="dragging === false && states.dragValue.el"
    ></drag-horizontal>
  </q-card>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import { fetchButtons } from '../../api';

import { useVectorStore } from '../../stores/vector/vectorStore';
import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';

import { defaultMessage } from '../../stores/defaults';

import MessageMenu from './sections/MessageMenu.vue';
import MessageButtons from './sections/MessageButtons.vue';
import EditTitle from '../edit/EditTitle.vue';
import DragHorizontal from './sections/DragHorizontal.vue';
import MessageMain from './sections/MessageMain.vue';
import MessageShadow from './sections/MessageShadow.vue';
import { config } from '../../../config';

const props = withDefaults(defineProps<MessageItemProps>(), {
  message: () => defaultMessage,
  index: () => 0,
  dragging: () => false,
});

const data = useDataStore();
const states = useStatesStore();
const vector = useVectorStore();

const isConnecting = computed(
  () => vector.connection && vector.mountedLine?.message_id !== props.message.id
);

const cancelConnecting = computed(
  () => vector.connection && vector.mountedLine?.message_id === props.message.id
);

const openMessage = () => {
  data.selectedMessage = props.message;

  states.openDialog('edit_message');
};

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
      data.scenarioValue = response.data.data;
    }
  );
};

interface MessageItemProps {
  message: MessageFree;
  dragging?: boolean;
  index?: number;
}
</script>
<style lang="scss">
.cancel-connection {
  background: rgba(214, 40, 40, 0.75);
}
.add-connection {
  background: rgba(255, 255, 255, 0.75);
}
.first-message--banner {
  position: absolute;
  top: -16px;
  left: -16px;
}
</style>
