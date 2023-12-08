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
    </q-card>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useCommandsStore } from '../stores/commandsStore';

import { defaultCommand } from '../../messages/stores/defaults';
import { setQueryParam } from 'src/utils/helpers/string';

const props = withDefaults(defineProps<CommandItemProps>(), {
  command: () => defaultCommand,
});

const commands = useCommandsStore();

const hint = computed(() => {
  if (props.command.is_column) return 'Сценарий';
  else if (props.command.is_menu && !props.command.is_column)
    return 'Действие (привязано к меню)';
  else return 'Действие';
});

const openAction = () => {
  commands.selectedCommand = props.command;

  if (props.command.is_column) {
    setQueryParam('route_id', props.command.id);
    commands.openDialog('scenario');

    return;
  }

  commands.openDialog('edit_action');
};

interface CommandItemProps {
  command: SCCommand;
}
</script>
<style lang="scss"></style>
