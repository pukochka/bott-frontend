<template>
  <div class="col-12 col-sm-4 col-md-3">
    <q-card flat bordered class="rounded" v-clickable @click="openAction">
      <q-card-section class="q-pa-sm">
        <div class="text-primary ellipsis">{{ command.label }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-body2 q-pa-sm text-item">
        {{ hint }}
      </q-card-section>

      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Нажмите, для изменения
      </q-tooltip>

      <router-link
        :to="'/control-panel/premium/scenarios/messages'"
        class="absolute-full"
        v-if="command.is_column"
      ></router-link>
    </q-card>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useDataStore } from '../stores/dataStore';

import { defaultCommand } from '../../messages/stores/deafults';

const props = withDefaults(defineProps<CommandItemProps>(), {
  command: () => defaultCommand,
});

const data = useDataStore();

const hint = computed(() => {
  if (props.command.is_column) return 'Сценарий';
  else if (props.command.is_menu && !props.command.is_column)
    return 'Действие (привязано к меню)';
  else return 'Действие';
});

const openAction = () => {
  if (props.command.is_column) return;

  data.selectedCommand = props.command;
  data.openDialog('edit_action');
};

interface CommandItemProps {
  command: SCCommand;
}
</script>
<style lang="scss"></style>
