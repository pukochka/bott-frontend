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

import { t } from 'src/boot/lang';
import { useDialog } from 'src/utils/use/useDialog';
import { useDataStore } from '../../stores/dataStore';

const data = useDataStore();

const openNotify = () => {
  useDialog(t('notify-delete-scenarios'));
};

const buttons = [
  {
    label: t('add-scenario'),
    icon: 'account_tree',
    action: () => data.openDialog('add_scenario'),
    color: 'primary',
    href: null,
  },
  {
    label: t('add-action'),
    icon: 'keyboard_command_key',
    action: () => data.openDialog('add_action'),
    color: 'primary',
    href: null,
  },
  {
    label: t('commands-for-botfather'),
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
    label: t('return-all'),
    icon: 'restart_alt',
    action: () => openNotify(),
    color: 'red',
    href: null,
  },
];
</script>

<style lang="scss" scoped></style>
