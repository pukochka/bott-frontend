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

  <edit-message></edit-message>

  <message-buttons></message-buttons>

  <message-type></message-type>

  <edit-label></edit-label>

  <button-settings></button-settings>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { fetchCommands, fetchMessage } from './api';

import { useStatesStore } from './stores/states/statesStore';
import { useVectorStore } from './stores/vector/vectorStore';

import ScenarioEditor from './components/sections/ScenarioEditor.vue';
import ScenarioHeader from './components/sections/ScenarioHeader.vue';

import VectorSection from './components/sections/VectorSection.vue';
import EditLabel from './components/edit/EditLabel.vue';
import EditMessage from './components/dialogs/message/EditMessage.vue';

import MessageItem from './components/items/MessageItem.vue';
import AddMessage from './components/dialogs/message/AddMessage.vue';
import MessageType from './components/dialogs/message/MessageType.vue';
import MessageButtons from './components/dialogs/message/MessageButtons.vue';
import ButtonSettings from './components/dialogs/ButtonSettings.vue';
import { getQueryParam } from '../../../utils/helpers/string';

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
  const route_id = Number(getQueryParam('route_id')) ?? 1;

  fetchMessage('types');
  fetchMessage('colors');
  fetchCommands('view', { route_id: route_id }).then();
});
</script>

<style lang="scss" scoped></style>
