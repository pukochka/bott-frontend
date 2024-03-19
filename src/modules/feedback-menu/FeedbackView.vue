<template>
  <div
    class="relative-position overflow-hidden"
    style="height: calc(100vh - 64px); width: 100%"
    :class="classes"
  >
    <canvas
      id="feedback-layer"
      :style="{ width: quasar.screen.width - (sm ? 60 : 0) + 'px' }"
    ></canvas>

    <q-menu
      touch-position
      v-if="visible"
      max-width="300px"
      class="bott-portal-menu"
    >
      <component :is="menu[opened]"></component>
    </q-menu>

    <transition
      :name="
        feedback.mobile.setting
          ? 'q-transition--slide-down'
          : 'q-transition--slide-up'
      "
    >
      <top-section v-if="sm || feedback.mobile.setting"></top-section>
    </transition>

    <transition
      :name="
        feedback.mobile.end
          ? 'q-transition--slide-left'
          : 'q-transition--slide-right'
      "
    >
      <end-section v-if="sm || feedback.mobile.end"></end-section>
    </transition>

    <transition
      :name="
        feedback.mobile.start
          ? 'q-transition--slide-right'
          : 'q-transition--slide-left'
      "
    >
      <start-section v-if="sm || feedback.mobile.start"></start-section>
    </transition>

    <mobile-section v-if="!sm"></mobile-section>

    <q-inner-loading
      :showing="feedback.loading"
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

  <touch-dialog></touch-dialog>

  <administrator-answer></administrator-answer>

  <api-integrations></api-integrations>

  <update-type-modal></update-type-modal>

  <integration-edit></integration-edit>

  <q-inner-loading
    v-close-popup
    @click="closeMenu"
    :showing="visible && desktop"
    class="bg-alpha cursor-default"
  >
    <div class="absolute-full"></div>
  </q-inner-loading>
</template>

<script setup lang="ts">
import { config } from './config';
import { computed, onBeforeMount } from 'vue';

import { fetchMessage } from './api/queries';
import { useFeedbackStore } from './stores/feedbackStore';
import { useQuasar } from 'quasar';

import { MenuNames } from './stores/feedbackModels';

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
import MobileSection from './components/sections/MobileSection.vue';
import TouchDialog from './components/dialogs/TouchDialog.vue';
import AdministratorAnswer from './components/dialogs/answer/AdministratorAnswer.vue';
import ApiIntegrations from './components/dialogs/ApiIntegrations.vue';
import IntegrationEdit from './components/dialogs/integrations/IntegrationEdit.vue';
import UpdateTypeModal from './components/dialogs/UpdateTypeModal.vue';

const feedback = useFeedbackStore();
const quasar = useQuasar();

const opened = computed(
  () =>
    Object.entries(feedback.menu)
      .filter(([_, value]) => value)
      .map(([key]) => key)?.[0] ?? 'create'
);

const menu = computed(() => ({
  create: CreateMenu,
  message: MessageMenu,
  link: LinkMenu,
}));

const sm = computed(() => !quasar.screen.lt.sm);
const desktop = computed(() => quasar.platform.is.desktop);

const classes = computed(
  () =>
    (feedback.dragging ? ' cursor-grabbing' : '') +
    (feedback.onconnection ? ' cursor-grab' : '') +
    (feedback.clickable ? ' cursor-pointer' : '')
);

const visible = computed(() =>
  Object.values(feedback.menu)
    .map((value) => value)
    .includes(true)
);
const closeMenu = () => {
  Object.keys(feedback.menu).forEach((key) => {
    feedback.menu[<MenuNames>key] = false;

    if (feedback.action) {
      feedback.action();
      feedback.action = null;
    }
  });
};

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
