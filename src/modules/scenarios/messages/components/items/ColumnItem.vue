<template>
  <div class="q-gutter-y-lg">
    <message-item
      v-for="(message, index) in column.messages"
      :key="message.id"
      :message="message"
      :index="index"></message-item>

    <div class="row">
      <q-btn
        v-show="!vector.mountedLine"
        flat
        no-caps
        color="primary"
        label="Добавить сообщение"
        class="col rounded"
        @click="addMessage" />
    </div>

    <drag-horizontal
      v-if="states.dragValue.el"
      :column_id="column.id"
      :sort="column.messages.length"></drag-horizontal>
  </div>
</template>
<script lang="ts" setup>
import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';
import { useVectorStore } from '../../stores/vector/vectorStore';

import { defaultColumn } from '../../stores/defaults';

import MessageItem from './MessageItem.vue';
import DragHorizontal from './sections/DragHorizontal.vue';

const props = withDefaults(defineProps<ColumnItemProps>(), {
  column: () => defaultColumn,
});

const states = useStatesStore();
const data = useDataStore();
const vector = useVectorStore();

const addMessage = () => {
  data.selectedColumn = props.column;
  states.openDialog('add_message');
};

interface ColumnItemProps {
  column: SCColumn;
}
</script>
