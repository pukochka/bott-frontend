<template>
  <router-link
    to="/desktop"
    class="row text-center items-center bordered bott-note__block-warning text-color--warning q-pa-xs rounded"
    v-clickable
  >
    <div class="col">
      <q-icon :name="mdiBell" size="26px" />
    </div>
    <div class="col">Уведомления</div>
    <div class="col">10</div>
  </router-link>

  <div class="">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="row items-center rounded q-gutter-y-sm" flat bordered>
          <div class="col-12 row">
            <bot-info-list :info="firstInfo"></bot-info-list>

            <bot-info-list :info="secondInfo"></bot-info-list>
          </div>

          <div class="col-12 q-gutter-y-sm">
            <bot-info-card></bot-info-card>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="rounded q-gutter-y-sm q-px-md q-pb-md" flat bordered>
          <div class="bott-page__subtitle">Настройки магазина</div>

          <view-buttons :buttons="settingsButtons"></view-buttons>

          <div class="bott-page__subtitle">Разделы</div>

          <view-buttons :buttons="sectionsButtons"></view-buttons>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { mdiBell } from '@quasar/extras/mdi-v7';

import sections from 'src/content/control/sections';
import { commonButtons } from '../../content/control/settings';
import {
  botTypes,
  currency,
  tariffs,
  language,
  userStatuses,
} from 'src/content/views';

import { useGlobalStore } from 'stores/data/globalStore';

import ViewButtons from 'src/components/views/ViewButtons.vue';

import BotInfoList from 'src/components/control-panel/BotInfoList.vue';
import BotInfoCard from 'src/components/control-panel/BotInfoCard.vue';

const data = useGlobalStore();

const sectionsButtons = computed(() => commonButtons[data.botData.type] ?? []);
const settingsButtons = computed(() => sections ?? []);

const info: InfoItem[] = [
  {
    label: 'Бот',
    value: data.botData.title,
  },
  {
    label: 'Ник',
    value: '@' + data.botData.name,
  },
  {
    label: 'Язык',
    value: language[data.botData.language_id].title,
  },
  {
    label: 'Тип',
    value: botTypes[data.botData.type].label,
    classes: `q-pa-xs rounded text-color--${botTypes[data.botData.type].color}`,
  },
  {
    label: 'Статус',
    value: userStatuses[data.botData.status].title,
    classes: `text-color--${userStatuses[data.botData.status].color}`,
  },
  {
    label: 'Тариф',
    value: tariffs[data.botData.tariff_id].label,
    classes: `q-pa-xs rounded text-color--${
      tariffs[data.botData.tariff_id].color
    }`,
    link: '/control-panel/buy-tariff',
  },
  {
    label: 'Создан',
    value: data.botData.created_at,
  },
  {
    label: 'Валюта',
    value: currency[data.botData.currency_id].short,
    classes: 'q-pa-xs rounded',
  },
];

const firstInfo = computed(() => info.slice(0, 4));
const secondInfo = computed(() => info.slice(4, info.length));

interface InfoItem {
  label: string;
  value: any;
  classes?: string;
  link?: string;
}
</script>

<style lang="scss" scoped></style>
