<template>
  <div class="col relative-position">
    <scenario-header></scenario-header>

    <q-separator />

    <div class="relative-position ellipsis" id="container">
      <q-scroll-area
        visible
        id="drag-copy-element"
        class="relative-position"
        :thumb-style="thumbStyle"
        style="height: calc(100vh - 111px); width: 100%"
        @scroll="vector.updateScroll"
      >
        <div :style="{ minHeight: '890px', minWidth: '1325px' }">
          <vector-section></vector-section>

          <scenario-editor v-if="states.initialization.data"></scenario-editor>

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
    </div>

    <q-inner-loading
      :showing="states.start"
      class="bott-page__layout"
      transition-show="none"
    >
      <q-spinner-gears size="80px" color="primary" />
    </q-inner-loading>
  </div>

  <add-message></add-message>

  <button-settings></button-settings>

  <add-button></add-button>

  <draggable-dial></draggable-dial>

  <message-buttons></message-buttons>

  <message-type></message-type>

  <message-text></message-text>

  <edit-label></edit-label>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { fetchCommands, fetchMessage } from './api';

import { useStatesStore } from './stores/states/statesStore';
import { useVectorStore } from './stores/vector/vectorStore';

import ScenarioEditor from './components/sections/ScenarioEditor.vue';
import ScenarioHeader from './components/sections/ScenarioHeader.vue';

import VectorSection from './components/sections/VectorSection.vue';
import EditLabel from './components/edit/EditLabel.vue';

import AddButton from './components/dialogs/buttons/AddButton.vue';
import ButtonSettings from './components/dialogs/buttons/ButtonSettings.vue';
import DraggableDial from './components/dialogs/buttons/DraggableDial.vue';

import MessageItem from './components/items/MessageItem.vue';
import AddMessage from './components/dialogs/message/AddMessage.vue';
import MessageType from './components/dialogs/message/MessageType.vue';
import MessageText from './components/dialogs/message/MessageText.vue';
import MessageButtons from './components/dialogs/message/MessageButtons.vue';

const states = useStatesStore();
const vector = useVectorStore();

const thumbStyle = {
  width: '8px',
  backgroundColor: 'var(--q-primary)',
  borderRadius: '10px',
  border: '4px solid rgba(0, 0, 0, 0)',
  margin: '2px',
};

onMounted(() => {
  fetchMessage('types');
  fetchMessage('colors');
  fetchCommands('view', { route_id: 1648290 }).then();
});
</script>

<style lang="scss" scoped></style>
