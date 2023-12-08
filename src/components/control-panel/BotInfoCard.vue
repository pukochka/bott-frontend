<template>
  <div class="q-gutter-y-xs q-px-md">
    <div class="">
      <div class="">Пользователи</div>

      <router-link to="/users" class="bott-text__router-link">
        <div class="row justify-center q-pa-lg rounded bordered" v-clickable>
          <div class="text-primary text-h3 text-weight-bold">3056</div>

          <div class="text-color--prism text-h4 text-weight-bold q-ml-xs">
            (4088)
          </div>

          <q-tooltip
            `class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
            `
          >
            <div>Соотношение активных/всех пользователей</div>

            <div>Нажмите для перехода в раздел пользователей</div>
          </q-tooltip>
        </div>
      </router-link>

      <div class="">
        <div class="row q-col-gutter-xs">
          <div class="col-12 col-sm-6">
            <div class="">Создатель</div>

            <div>
              <span class="bott-text__link">@melart</span>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="">Менеджеры</div>

            <div>
              <span class="bott-text__link">@mmmmm</span>,
              <span class="bott-text__link">@oppo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="q-px-md q-pb-md">
    <view-buttons :buttons="controlPanelMainButtons"></view-buttons>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiAccountCog,
  mdiAlertCircle,
  mdiCogs,
  mdiDecagramOutline,
  mdiHandWave,
  mdiRefresh,
} from '@quasar/extras/mdi-v7';

import ViewButtons from 'src/components/views/ViewButtons.vue';
import { t } from 'src/boot/lang';

const controlPanelMainButtons = [
  {
    label: t('welcome-in-bot'),
    icon: mdiHandWave,
    color: 'green',
    link: '/control-panel/welcome-message',
  },
  {
    label: t('incorrect-message'),
    icon: mdiAlertCircle,
    color: 'red',
    link: '/control-panel/incorrect-message',
  },
  {
    label: t('premium-settings'),
    icon: mdiDecagramOutline,
    color: 'yellow-8',
    link: '/control-panel/premium',
  },
  {
    label: 'Обновить токен (Перезапуск бота)',
    icon: mdiRefresh,
    color: 'prism',
    link: '#',
  },
  {
    label: t('settings'),
    icon: mdiCogs,
    color: 'grey',
    link: '/control-panel/settings',
  },

  {
    label: t('page-control-profile'),
    icon: mdiAccountCog,
    color: 'primary',
    link: '/control-panel/control-profile',
  },
];
</script>

<style lang="scss" scoped></style>
