<template>
  <q-card flat bordered class="rounded overflow-hidden">
    <panel-header
      v-if="inline.settings.length"
      label="Настройки сообщения"
      icon="tune"
    ></panel-header>

    <q-list v-if="inline.settings.length">
      <component
        @loading="update"
        :is="components[setting.type]"
        :setting="setting"
        v-for="(setting, index) of inline.settings"
        :key="index"
      ></component>
    </q-list>

    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col-12 col-sm-6">
        <q-btn
          flat
          no-caps
          class="rounded fit"
          size="md"
          color="orange"
          label="Изменить тип сообщения"
          @click="inline.openDialog('edit_type_message')"
        />
      </div>

      <div class="col-12 col-sm-6 row q-col-gutter-x-sm">
        <div class="col" v-if="inline.message.is_test">
          <q-btn
            flat
            class="rounded fit"
            size="md"
            color="green"
            :icon="laTelegram"
            :loading="loading.send"
            @click="sendTestMessage"
          >
            <q-tooltip
              class="bott-tooltip"
              anchor="top middle"
              self="bottom middle"
            >
              Отправить тестовое сообщение в ЛС
            </q-tooltip>
          </q-btn>
        </div>

        <div class="col" v-if="inline.message.is_copy">
          <q-btn
            flat
            class="rounded fit"
            size="md"
            color="primary"
            icon="content_copy"
            @click="copy"
          >
            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Копировать ссылку на сообщение
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading.setting">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup lang="ts">
import config from '../../config';
import { copyToClipboard } from 'quasar';
import { ref } from 'vue';

import { laTelegram } from '@quasar/extras/line-awesome';
import { useInlineStore } from '../../stores/inlineStore';
import { fetchMessage } from '../../api/queries';
import { useNotify } from '../../stores/helpers';

import SettingCheckbox from './types/SettingCheckbox.vue';
import SettingInput from './types/SettingInput.vue';
import SettingDate from './types/SettingDate.vue';
import SettingDateTime from './types/SettingDateTime.vue';

import PanelHeader from '../PanelHeader.vue';

const inline = useInlineStore();

const loading = ref({
  setting: false,
  send: false,
});

const update = (value: boolean) => (loading.value.setting = value);

const copy = () => {
  copyToClipboard(
    'https://t.me/' + config.bot.name + '?start=f_' + inline.message.id
  ).then(() => {
    useNotify('Ссылка скопированна!');
  });
};

const sendTestMessage = () => {
  loading.value.send = true;

  fetchMessage('test', {
    message_id: inline.message.id,
    user_id: user_id,
  }).then(() => {
    loading.value.send = false;
  });
};

const components = {
  checkbox: SettingCheckbox,
  input: SettingInput,
  date: SettingDate,
  date_time: SettingDateTime,
};
</script>

<style scoped lang="scss"></style>
