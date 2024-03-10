<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="states.dialogs.edit_message"
  >
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <div class="row items-center justify-between q-px-md q-py-sm">
          <q-toolbar-title>Меню сообщения</q-toolbar-title>

          <div class=""></div>

          <q-btn round flat dense color="primary" icon="close" v-close-popup />
        </div>

        <q-card-section class="q-pt-none">
          <inline-menu
            scenarios
            no-breadcrumbs
            :message="data.selectedMessage"
            :bot_id="config.bot.id"
            :token="config.bot.token"
            :host="config.host"
          ></inline-menu>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>
<script setup lang="ts">
import { config } from '../../../../config';

import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

import InlineMenu from '../../../../../inline/InlineMenu.vue';

const states = useStatesStore();
const data = useDataStore();
</script>
