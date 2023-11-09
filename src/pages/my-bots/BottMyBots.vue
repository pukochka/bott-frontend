<template>
  <div
    class="font-20 text-center text-grey text-weight-medium q-py-xl"
    v-if="false"
  >
    У вас пока нет ботов
  </div>

  <div class=""></div>

  <div class="row q-col-gutter-md">
    <div
      class="col-12 col-sm-6 col-lg-4"
      v-for="bot in data.userBots"
      :key="bot.id"
    >
      <q-card flat bordered class="rounded">
        <router-link
          :to="'/control-panel?bot_id=' + bot.id"
          @click="data.botData = bot"
        >
          <q-card-section v-clickable class="bott-text__link q-pa-sm">
            <div class="text-h6 ellipsis">{{ bot.name }}</div>

            <q-tooltip
              class="bott-tooltip"
              anchor="top middle"
              self="bottom middle"
            >
              Рабочий стол бота <b>{{ bot.name }}</b>
            </q-tooltip>
          </q-card-section>
        </router-link>

        <q-separator />

        <q-card-section class="q-pa-sm">
          <q-list dense>
            <q-item v-for="(item, index) of info" :key="index">
              <q-item-section>{{ item.label }}</q-item-section>

              <q-item-section side style="max-width: 80%">
                <router-link :to="item.link" class="row justify-center">
                  <view-content
                    v-clickable
                    class="text-center bott-token"
                    :status="item.status(bot)"
                    :content="item.content"
                  >
                    <q-tooltip
                      v-if="item.tooltip"
                      class="bott-tooltip"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      {{ item.tooltip }}
                    </q-tooltip>
                  </view-content>
                </router-link>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="row q-col-gutter-x-sm no-wrap q-pt-none q-pa-sm">
          <div class="col-4" v-for="(button, index) of buttons" :key="index">
            <q-btn
              flat
              size="md"
              :color="button.color"
              class="fit rounded"
              :icon="button.icon"
            >
              <q-tooltip
                class="bott-tooltip"
                anchor="top middle"
                self="bottom middle"
              >
                {{ button.label }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <q-btn
          outline
          no-caps
          size="lg"
          class="rounded fit"
          color="primary"
          label="Создать бота"
          to="/desktop"
        />
      </div>

      <div class="col-12 col-sm-6">
        <q-btn
          outline
          no-caps
          size="lg"
          class="rounded fit"
          color="primary"
          label="Заказать бота"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from 'stores/data/globalStore';

import { botTypes, tariffs } from 'src/content/views';

import { mdiCog, mdiDelete, mdiRefresh } from '@quasar/extras/mdi-v7';

import { BOTBot } from 'stores/data/model';

import ViewContent from 'src/components/views/ViewContent.vue';

const data = useGlobalStore();

const buttons = [
  {
    label: 'Редактировать настройки бота',
    icon: mdiCog,
    link: '',
    color: 'primary',
  },
  {
    label: 'Перезагрузить бота и обновить webhook',
    icon: mdiRefresh,
    link: '',
    color: 'primary',
  },
  {
    label: 'Удалить бота',
    icon: mdiDelete,
    link: '',
    color: 'red',
  },
];

const info = [
  {
    label: 'Тариф',
    content: tariffs,
    status: (bot: BOTBot) => bot.tariff_id,
    link: '/control-panel/buy-tariff',
    tooltip: 'Продлить/улучшить тариф',
  },
  {
    label: 'Тип',
    content: botTypes,
    status: (bot: BOTBot) => bot.type,
    link: '/buy',
    tooltip: null,
  },
];
</script>

<style lang="scss" scoped></style>
