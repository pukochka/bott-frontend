<template>
  <div
    class="q-gutter-y-md q-pa-lg q-py-xl overflow-hidden"
    :style="{
      height: commands.dialogs.scenario ? `calc(100vh - 100px)` : 'auto',
    }"
  >
    <div class="bott-page__title">Сценарии и действия</div>

    <q-breadcrumbs>
      <q-breadcrumbs-el
        class="q-px-xs rounded"
        :label="bread.label"
        @click="bread.action"
        v-clickable="bread.clickable"
        v-for="(bread, index) of breadcrumbs"
        :key="index"
      />
    </q-breadcrumbs>

    <commands-header></commands-header>

    <commands-list></commands-list>
  </div>

  <add-scenario></add-scenario>

  <add-action></add-action>

  <edit-command></edit-command>

  <add-message-modal></add-message-modal>

  <edit-message-modal></edit-message-modal>

  <update-type-modal></update-type-modal>

  <edit-label></edit-label>

  <button-settings></button-settings>

  <transition name="q-transition--fade">
    <scenario-messages v-if="commands.dialogs.scenario"></scenario-messages>
  </transition>
</template>

<script lang="ts" setup>
import { config } from '../config';
import { computed, onBeforeMount } from 'vue';

import { fetchCommands, fetchMessage } from './api/command';
import { useCommandsStore } from './stores/commandsStore';
import { historyGo } from 'src/utils/helpers/string';
import { has } from 'src/utils/helpers/string';

import CommandsList from './components/sections/CommandsList.vue';
import CommandsHeader from './components/sections/CommandsHeader.vue';

import AddScenario from './components/dialogs/AddScenario.vue';
import AddAction from './components/dialogs/AddAction.vue';

import EditCommand from './components/dialogs/EditAction.vue';
import ScenarioMessages from '../messages/ScenarioMessages.vue';
import ButtonSettings from '../messages/components/dialogs/ButtonSettings.vue';
import EditLabel from '../messages/components/edit/EditLabel.vue';
import EditMessageModal from '../messages/components/dialogs/message/EditMessageModal.vue';
import UpdateTypeModal from '../messages/components/dialogs/message/UpdateTypeModal.vue';
import AddMessageModal from '../messages/components/dialogs/message/AddMessageModal.vue';

const commands = useCommandsStore();

onBeforeMount(() => {
  fetchMessage('types');
  fetchMessage('colors');

  if (has('route_id')) {
    commands.openDialog('scenario');
  }

  fetchCommands('index');
});

const breadcrumbs = computed(() => [
  {
    label: 'Панель управления',
    action: () => historyGo('/shop/desktop/index?bot_id=' + config.bot.id),
    clickable: true,
  },
  {
    label: 'Платные настройки',
    action: () => historyGo('/lk/common/main/redirect?bot_id=' + config.bot.id),
    clickable: true,
  },
  {
    label: 'Сценарии и действия',
    action: null,
    clickable: false,
  },
]);
</script>
