<template>
  <div class="row no-wrap fit q-pa-lg">
    <div
      class="flex no-wrap"
      style="margin-bottom: 500px"
      v-for="column in data.scenarioValue?.columns"
      :key="column.id"
    >
      <column-item :column="column"></column-item>

      <div class="q-px-xl"></div>
    </div>

    <div style="width: 370px">
      <q-btn
        v-show="!vector.mountedLine"
        flat
        no-caps
        class="full-width rounded"
        color="primary"
        label="Добавить сообщение"
        @click="addMessage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated } from 'vue';

import { useDataStore } from '../../stores/data/dataStore';
import { useStatesStore } from '../../stores/states/statesStore';
import { useVectorStore } from '../../stores/vector/vectorStore';

import ColumnItem from '../items/ColumnItem.vue';

const data = useDataStore();
const states = useStatesStore();
const vector = useVectorStore();

const addMessage = () => {
  data.selectedColumn = null;
  states.openDialog('add_message');
};

async function mountingLines() {
  await Promise.all([
    vector.positionParent(),
    vector.mountingConnections(),
    vector.renderCombine(),
  ]).then(() => (states.initialization.lines = true));
}

onMounted(mountingLines);
onUpdated(() => setTimeout(vector.update.bind(vector), 20));
</script>

<style lang="scss" scoped></style>
