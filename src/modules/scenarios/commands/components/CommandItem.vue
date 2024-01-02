<template>
  <div class="col-12 col-sm-4 col-md-3">
    <q-card
      flat
      bordered
      class="rounded overflow-hidden"
      v-clickable
      @click="openAction"
    >
      <div
        class="absolute-full"
        style="opacity: 0.2"
        :class="['bg-' + hint.color]"
      ></div>
      <q-card-section class="q-pa-sm">
        <div class="text-primary ellipsis">{{ command.label }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-body2 q-pa-sm relative-position text-item">
        {{ hint.name }}
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

const hint = computed(
  () =>
    [
      {
        name: 'Сценарий',
        condition: props.command.is_column && !props.command.is_menu,
        color: 'white',
      },
      {
        name: 'Сценарий (привязан к главному меню)',
        condition: props.command.is_column && props.command.is_menu,
        color: 'primary',
      },
      {
        name: 'Действие',
        condition: !props.command.is_column && !props.command.is_menu,
        color: 'white',
      },
      {
        name: 'Действие (привязано к главному меню)',
        condition: !props.command.is_column && props.command.is_menu,
        color: 'warning',
      },
    ].filter((item) => item.condition)?.[0] ?? {
      name: 'Сценарий',
      color: 'primary',
    }
);

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
