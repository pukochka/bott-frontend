<template>
  <div class="col-12 col-sm-4 col-md-3">
    <q-card flat bordered class="rounded overflow-hidden fit" v-clickable>
      <div
        class="absolute-full"
        style="opacity: 0.2"
        :class="['bg-' + hint.color]"
      ></div>

      <q-card-section class="row no-wrap items-center justify-between q-pa-sm">
        <div class="text-primary ellipsis">{{ command.label }}</div>

        <div class="absolute-full" @click="openAction"></div>

        <q-btn
          class="rounded"
          padding="2px"
          flat
          size="md"
          color="primary"
          icon="more_vert"
          v-if="command.is_column"
        >
          <q-menu class="bott-portal-menu">
            <q-list dense>
              <q-item clickable v-close-popup @click="openEdit">
                <q-item-section avatar>
                  <q-icon name="edit" color="primary" size="26px" />
                </q-item-section>

                <q-item-section>Переименовать</q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="deleteScenario">
                <q-item-section avatar>
                  <q-icon name="delete" color="red" size="26px" />
                </q-item-section>

                <q-item-section>Удалить</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-body2 q-pa-sm relative-position text-item">
        <div class="absolute-full" @click="openAction"></div>

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
import { useStatesStore } from '../../messages/stores/states/statesStore';
import { useDataStore } from '../../messages/stores/data/dataStore';
import { useDialog } from '../../../../utils/use/useDialog';
import { fetchCommands } from '../../messages/api';

const props = withDefaults(defineProps<CommandItemProps>(), {
  command: () => defaultCommand,
});

const commands = useCommandsStore();
const states = useStatesStore();
const data = useDataStore();

const openEdit = () => {
  data.scenarioValue = props.command;
  states.openDialog('edit_label');
};

const deleteScenario = () => {
  useDialog(
    'Вы уверены, что хотите удалить сценарий и все сообщения связанные с ним?',
    true
  ).onOk(() => {
    fetchCommands('delete', { route_id: props.command.id }).then(() => {
      fetchCommands('index', undefined, (response) => {
        commands.commands = response.data.data;
      });
    });
  });
};

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
