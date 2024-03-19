<template>
  <div
    class="q-px-md flex justify-between items-center no-wrap"
    style="height: 50px"
  >
    <q-btn v-if="sm" flat round size="md" color="primary" icon="more_vert">
      <q-menu max-width="200px" class="bott-portal-menu q-pa-xs">
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
      </q-menu>
    </q-btn>

    <q-breadcrumbs v-else>
      <q-breadcrumbs-el
        class="q-px-xs rounded"
        :label="bread.label"
        @click="bread.action"
        v-clickable="bread.clickable"
        v-for="(bread, index) of breadcrumbs"
        :key="index"
      />
    </q-breadcrumbs>

    <q-card flat bordered class="rounded">
      <q-btn
        style="max-width: 200px"
        flat
        no-caps
        color="primary"
        class="text-weight-bold rounded"
      >
        <div class="ellipsis">
          {{ data.scenarioValue?.label ?? 'Загрузка...' }}
        </div>

        <q-menu
          fit
          anchor="bottom left"
          self="top left"
          class="bott-portal-menu"
        >
          <q-list separator dense>
            <q-item
              clickable
              v-close-popup
              class="row items-center"
              :href="button.href"
              v-for="(button, index) in menuButtons"
              :key="index"
              @click="button.action"
            >
              <q-icon :name="button.icon" :color="button.color" size="22px" />

              <div class="text-center q-ml-md flex-grow">
                {{ button.label }}
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { config } from '../../../config';
import { computed } from 'vue';

import { useStatesStore } from '../../stores/states/statesStore';
import { useDataStore } from '../../stores/data/dataStore';
import { useVectorStore } from '../../stores/vector/vectorStore';
import { historyGo } from 'src/utils/helpers/string';
import { deleteQueryParam } from 'src/utils/helpers/string';
import { useCommandsStore } from '../../../commands/stores/commandsStore';
import { useQuasar } from 'quasar';
import { useDialog } from 'src/utils/use/useDialog';
import { fetchCommands } from '../../../messages/api';

const states = useStatesStore();
const data = useDataStore();
const commands = useCommandsStore();
const vector = useVectorStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);

const deleteScenario = () => {
  useDialog(
    'Вы уверены, что хотите удалить сценарий и все сообщения связанные с ним?',
    true
  ).onOk(() => {
    fetchCommands('delete', { route_id: data.scenarioValue?.id ?? 0 }).then(
      () => {
        deleteQueryParam('route_id');
        commands.closeDialog('scenario');
        window.location.reload();
      }
    );
  });
};

const menuButtons = [
  {
    label: 'Изменить название',
    color: 'primary',
    icon: 'edit',
    href: undefined,
    action: () => states.openDialog('edit_label'),
  },
  {
    label: 'FAQ',
    color: 'primary',
    icon: 'quiz',
    href: '/lk/common/premium/route/help?bot_id=' + 886,
    action: () => '',
  },
  {
    label: 'Удалить',
    color: 'red',
    icon: 'close',
    href: undefined,
    action: () => deleteScenario(),
  },
];

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
    action() {
      deleteQueryParam('route_id');

      data.scenarioValue = null;
      vector.combineLines = [];
      vector.connections = [];
      vector.linesValue = [];

      commands.closeDialog('scenario');
    },
    clickable: true,
  },
  {
    label: data.scenarioValue?.label ?? 'Загрузка...',
    action: null,
    clickable: false,
  },
]);
</script>
<style lang="scss"></style>
