<template>
  <commands-header></commands-header>

  <commands-list></commands-list>

  <add-scenario></add-scenario>

  <add-action></add-action>

  <edit-command></edit-command>

  <transition name="q-transition--fade">
    <div class="absolute-full q-ma-none bg-brand" v-if="commands.scenario">
      <scenario-messages></scenario-messages>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';

import { fetchCommands, fetchMessage } from './api/command';
import { useCommandsStore } from './stores/commandsStore';

import CommandsList from './components/sections/CommandsList.vue';
import CommandsHeader from './components/sections/CommandsHeader.vue';

import AddScenario from './components/dialogs/AddScenario.vue';
import AddAction from './components/dialogs/AddAction.vue';

import EditCommand from './components/dialogs/EditAction.vue';
import ScenarioMessages from '../messages/ScenarioMessages.vue';

const commands = useCommandsStore();

onBeforeMount(() => {
  fetchMessage('types');
  fetchCommands('index');
});
</script>
