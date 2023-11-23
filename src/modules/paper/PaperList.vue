<template>
  <div
    class="relative-position overflow-hidden"
    style="height: calc(100vh - 64px); width: 100%"
    :class="classes"
  >
    <canvas
      id="feedback-layer"
      :style="{ width: quasar.screen.width - 60 + 'px' }"
    ></canvas>

    <create-input></create-input>

    <!--    <goodbye-menu></goodbye-menu>-->

    <main-menu></main-menu>

    <start-menu></start-menu>

    <end-menu></end-menu>

    <bottom-menu></bottom-menu>

    <q-inner-loading
      v-close-popup
      @click="closeMenu"
      :showing="store.position.visible"
      class="bg-alpha cursor-default"
    >
      <div class=""></div>
    </q-inner-loading>
  </div>

  <notify-setting></notify-setting>

  <users-answers></users-answers>

  <feedback-settings></feedback-settings>
</template>

<script setup lang="ts">
import { config } from './config';
import { computed, onBeforeMount, onMounted } from 'vue';
import { fetchMessage } from './api/queries';
import { install } from './utils/create';
import { usePSStore } from './stores/PSstore';
import { useQuasar } from 'quasar';

import EndMenu from './components/EndMenu.vue';
import NotifySetting from './components/dialogs/NotifySetting.vue';
import CreateInput from './components/CreateInput.vue';
import StartMenu from './components/StartMenu.vue';
import MainMenu from './components/MainMenu.vue';
import BottomMenu from './components/BottomMenu.vue';
import UsersAnswers from './components/dialogs/UsersAnswers.vue';
import FeedbackSettings from './components/dialogs/FeedbackSettings.vue';

const store = usePSStore();
const quasar = useQuasar();

const closeMenu = () => {
  store.position.visible = false;
  if (store.position.action) store.position.action();
};

const classes = computed(
  () =>
    (store.dragging ? ' cursor-grabbing' : '') +
    (store.onmessage || store.onconnection ? ' cursor-grab' : '') +
    (store.clickable ? ' cursor-pointer' : '')
);

onMounted(install);
onBeforeMount(() => {
  fetchMessage('get', { message_id: config.message_id });
});
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
.cursor-grabbing {
  cursor: grabbing !important;
}
.cursor-grab {
  cursor: grab;
}
.cursor-default {
  cursor: default !important;
}
.bg-alpha {
  background: rgba(0, 0, 0, 0.28);
}
</style>
