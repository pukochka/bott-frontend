<template>
  <commands-header></commands-header>

  <commands-list></commands-list>

  <add-scenario></add-scenario>

  <add-action></add-action>

  <edit-command></edit-command>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';

import { fetchCommands } from './api/command';
import { fetchMessage } from './api/message';

import CommandsList from './components/sections/CommandsList.vue';
import CommandsHeader from './components/sections/CommandsHeader.vue';

import AddScenario from './components/dialogs/AddScenario.vue';
import AddAction from './components/dialogs/AddAction.vue';

import EditCommand from './components/dialogs/EditAction.vue';

onBeforeMount(() => {
  fetchMessage('types');
  fetchCommands('index');
});
</script>
