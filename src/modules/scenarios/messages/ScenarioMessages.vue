<template>
  <div class="absolute-full q-ma-none bg-grey-2" style="padding-left: 60px">
    <div class="col relative-position">
      <scenario-header></scenario-header>

      <q-separator />

      <div class="relative-position ellipsis" id="container">
        <q-scroll-area
          visible
          style="height: calc(100vh - 111px); width: 100%"
          id="drag-copy-element"
          class="relative-position"
          :thumb-style="thumbStyle"
          @scroll="vector.updateScroll"
        >
          <div :style="{ minHeight: '890px', minWidth: '1325px' }">
            <vector-section></vector-section>

            <scenario-editor
              v-if="states.initialization.data"
            ></scenario-editor>

            <div
              class="absolute"
              v-if="states.dragValue.el !== null"
              :style="{
                top: states.dragValue.y + 'px',
                left: states.dragValue.x + 'px',
              }"
            >
              <message-item
                :message="states.dragValue.el"
                dragging
              ></message-item>
            </div>
          </div>
        </q-scroll-area>

        <q-inner-loading
          :showing="states.start"
          class="bott-page__layout"
          transition-show="none"
        >
          <q-spinner-gears size="80px" color="primary" />
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onUnmounted } from 'vue';
import { fetchCommands } from './api';

import { useStatesStore } from './stores/states/statesStore';
import { useVectorStore } from './stores/vector/vectorStore';
import { getQueryParam } from 'src/utils/helpers/string';

import ScenarioEditor from './components/sections/ScenarioEditor.vue';
import ScenarioHeader from './components/sections/ScenarioHeader.vue';

import VectorSection from './components/sections/VectorSection.vue';
import MessageItem from './components/items/MessageItem.vue';

const states = useStatesStore();
const vector = useVectorStore();

const thumbStyle = {
  width: '8px',
  backgroundColor: 'var(--q-primary)',
  borderRadius: '10px',
  border: '4px solid rgba(0, 0, 0, 0)',
  margin: '2px',
};

onBeforeMount(() => {
  states.initialization.data = false;
  const route_id = Number(getQueryParam('route_id')) ?? 1;

  fetchCommands('view', { route_id: route_id });
});

onUnmounted(() => {
  vector.connections = [];
  vector.linesValue = [];

  states.initialization.data = false;
  states.initialization.lines = false;
});
</script>

<style lang="scss" scoped></style>
