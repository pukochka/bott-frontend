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

    <create-menu></create-menu>

    <link-menu></link-menu>

    <message-menu></message-menu>

    <top-section></top-section>

    <start-section></start-section>

    <end-section></end-section>

    <q-inner-loading
      :showing="store.loading"
      class="bg-white"
      transition-show="none"
      transition-hide="fade"
    >
      <q-spinner size="90px" color="primary" />
    </q-inner-loading>
  </div>

  <notify-setting></notify-setting>

  <users-answers></users-answers>

  <feedback-setting></feedback-setting>

  <message-setting></message-setting>

  <message-free-setting></message-free-setting>

  <crossroad-setting></crossroad-setting>

  <crossroad-option></crossroad-option>

  <q-inner-loading
    v-close-popup
    @click="closeMenu"
    :showing="visible"
    class="bg-alpha cursor-default"
  >
    <div class="absolute-full"></div>
  </q-inner-loading>
</template>

<script setup lang="ts">
import { config } from './config';
import { computed, onBeforeMount } from 'vue';
import { fetchMessage } from './api/queries';
import { usePSStore } from './stores/PSstore';
import { useQuasar } from 'quasar';

import { MenuNames } from './stores/FeedbackModels';

import LinkMenu from './components/menu/LinkMenu.vue';
import CreateMenu from './components/menu/CreateMenu.vue';
import MessageMenu from './components/menu/MessageMenu.vue';

import StartSection from './components/sections/StartSection.vue';
import EndSection from './components/sections/EndSection.vue';
import TopSection from './components/sections/TopSection.vue';

import UsersAnswers from './components/dialogs/UsersAnswers.vue';
import FeedbackSetting from './components/dialogs/FeedbackSetting.vue';
import MessageSetting from './components/message/MessageSetting.vue';
import NotifySetting from './components/dialogs/NotifySetting.vue';
import MessageFreeSetting from './components/dialogs/MessageFreeSetting.vue';
import CrossroadSetting from './components/dialogs/CrossroadSetting.vue';
import CrossroadOption from './components/dialogs/CrossroadOption.vue';

const store = usePSStore();
const quasar = useQuasar();

const visible = computed(() =>
  Object.entries(store.menu)
    .map(([_, value]) => value)
    .includes(true)
);
const closeMenu = () => {
  Object.entries(store.menu).forEach(([key]) => {
    store.menu[<MenuNames>key] = false;

    if (store.action) {
      store.action();
      store.action = null;
    }
  });
};

const classes = computed(
  () =>
    (store.dragging ? ' cursor-grabbing' : '') +
    (store.onmessage || store.onconnection ? ' cursor-grab' : '') +
    (store.clickable ? ' cursor-pointer' : '')
);

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
