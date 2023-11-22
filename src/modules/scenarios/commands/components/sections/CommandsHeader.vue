<template>
  <div class="">
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-sm-6 col-md"
        v-for="button in buttons"
        :key="button.label"
      >
        <q-btn
          stack
          outline
          no-caps
          size="md"
          class="fit rounded"
          :color="button.color"
          :icon="button.icon"
          :label="button.label"
          :href="button.href"
          @click="button.action"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import config from '../../../config';

import { useDialog } from 'src/utils/use/useDialog';
import { useCommandsStore } from '../../stores/commandsStore';
import { historyGo } from '../../../../inline-menu/stores/helpers';

const commands = useCommandsStore();

const openNotify = () => {
  useDialog(
    'Вы уверены, что хотите сбросить все действия и сценария без возможности восстановления?',
    true
  ).onOk(() => {
    historyGo('/lk/common/premium/route/reset?bot_id=' + config.bot.id);
  });
};

const buttons = [
  {
    label: 'Добавить сценарий',
    icon: 'account_tree',
    action: () => commands.openDialog('add_scenario'),
    color: 'primary',
    href: undefined,
  },
  {
    label: 'Добавить действие',
    icon: 'keyboard_command_key',
    action: () => commands.openDialog('add_action'),
    color: 'primary',
    href: undefined,
  },
  {
    label: 'Команды для BotFather',
    icon: 'smart_toy',
    action: '',
    color: 'primary',
    href: `/lk/common/premium/route/generate-commands?bot_id=${config.bot.id}`,
  },
  {
    label: 'FAQ',
    icon: 'quiz',
    action: '',
    color: 'primary',
    href: `/lk/common/premium/route/help?bot_id=${config.bot.id}`,
  },
  {
    label: 'Сбросить всё',
    icon: 'restart_alt',
    action: () => openNotify(),
    color: 'red',
    href: undefined,
  },
];
</script>

<style lang="scss" scoped></style>
