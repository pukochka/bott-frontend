<template>
  <q-card
    flat
    bordered
    class="rounded relative-position q-gutter-y-sm q-pa-sm"
    :id="'message_' + message.id"
    style="max-width: 370px; min-width: 370px"
  >
    <div
      class="bott-message--combine-target absolute-top"
      :id="'top_target_' + message.id"
    ></div>

    <div
      class="bott-message--combine-target absolute-bottom"
      :id="'bottom_target_' + message.id"
    ></div>

    <q-badge
      class="rounded q-mt-none cursor-pointer first-message--banner q-pa-xs"
      v-if="message.active"
    >
      <span class="text-weight-medium">Стартовое сообщение</span>

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
      v-if="dragging === false && props.message.type.id !== 7"
      :message="message"
    ></message-buttons>

    <div class="row items-center" v-if="props.message.type.id !== 7">
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
      v-if="(vector.connection || vector.combining) && activeShadow"
      :icon="activeShadow.icon"
      :class="activeShadow.class"
      :label="activeShadow.label"
      :tooltip="activeShadow.tooltip"
      :showing="activeShadow.showing"
      @click="activeShadow.action"
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
import { config } from '../../../config';
import { computed, onBeforeMount } from 'vue';

import { fetchButtons, fetchMessage } from '../../api';

import { useVectorStore } from '../../stores/vector/vectorStore';
import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';
import { useConnect } from '../../../utils';

import { defaultMessage } from 'src/utils/helpers/defaults';

import MessageMenu from './sections/MessageMenu.vue';
import MessageButtons from './sections/MessageButtons.vue';
import EditTitle from '../edit/EditTitle.vue';
import DragHorizontal from './sections/DragHorizontal.vue';
import MessageMain from './sections/MessageMain.vue';
import MessageShadow from './sections/MessageShadow.vue';

import { mdiMessageMinus, mdiMessagePlus } from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<MessageItemProps>(), {
  message: () => defaultMessage,
  index: () => 0,
  dragging: () => false,
});

const data = useDataStore();
const states = useStatesStore();
const vector = useVectorStore();

const concurrenceConnection = computed(
  () => vector.mountedLine?.message_id === props.message.id
);

const concurrenceCombine = computed(
  () => Number(vector.mountedCombine?.id) === props.message.id
);

const openMessage = () => {
  data.selectedMessage = props.message;

  states.openDialog('edit_message');
};

const startDrag = (e: MouseEvent) => {
  states.startDrag(e, props.message);
};

const cancelConnection = () => {
  if (vector.editConnection) {
    const [message_id, button_id] = vector.editConnection;
    const line = vector.linesValue.find((item) => item.button_id === button_id);

    if (line) {
      line.line = useConnect(message_id, button_id);
    }

    vector.editConnection = null;
    vector.mountedLine = null;

    return;
  }
  vector.linesValue.pop();

  vector.mountedLine = null;
};

const cancelCombine = () => {
  if (vector.editCombine) {
    vector.updateCurrentCombine();
    vector.mountedCombine = null;

    return;
  }

  vector.combineLines.pop();

  vector.mountedCombine = null;
};

const createCombine = () => {
  vector.endCombine(props.message.id);
  const message = data.selectedMessage || defaultMessage;

  fetchMessage(
    'set-next-message',
    {
      message_id: data.selectedMessage?.id ?? 0,
      message_next_id: props.message.id,
    },
    (response) => {
      message.nextMessage = response.data.data.nextMessage;
    }
  );
};

const createConnection = () => {
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

const activeShadow = computed(
  () => shadows.value.filter((item) => item.showing)[0]
);

const shadows = computed(() => [
  {
    label: 'Отменить связь',
    tooltip: 'Нажмите для отмены связи',
    icon: 'close',
    class: 'cancel-connection',
    showing: !vector.combining && concurrenceConnection.value,
    action: cancelConnection,
  },
  {
    label: 'Наведите на блок и нажмите на него для связи',
    tooltip: 'Нажмите для связи',
    icon: 'ads_click',
    class: 'add-connection',
    showing: !vector.combining && !concurrenceConnection.value,
    action: createConnection,
  },
  {
    label: 'Совместить',
    tooltip: undefined,
    icon: mdiMessagePlus,
    class: 'add-connection',
    showing: !vector.connection && !concurrenceCombine.value,
    action: createCombine,
  },
  {
    label: 'Отменить совмещение',
    tooltip: undefined,
    icon: mdiMessageMinus,
    class: 'cancel-connection',
    showing: !vector.connection && concurrenceCombine.value,
    action: cancelCombine,
  },
]);

onBeforeMount(() => {
  if (props.message.nextMessage === null) return;

  vector.followingMessages.push([
    props.message.id,
    props.message.nextMessage.id,
  ]);
});

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
.bott-message--combine-target {
  width: 1px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
