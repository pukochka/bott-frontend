<template>
  <q-card flat bordered class="rounded overflow-hidden">
    <panel-header
      v-if="settings.length"
      label="Настройки сообщения"
      icon="tune"
    ></panel-header>

    <q-list v-if="settings.length">
      <component
        @loading="update"
        :is="
          setting.key === 'effect_id' ? SettingDate : components[setting.type]
        "
        :effects="effects"
        @update-setting="updateSettings"
        :setting="setting"
        v-for="(setting, index) of settings"
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
          @click="emit('update-type')"
        />
      </div>

      <div class="col-12 col-sm-6 row q-col-gutter-x-sm">
        <div class="col" v-if="message.is_test">
          <q-btn
            flat
            class="rounded fit"
            size="md"
            color="green"
            :icon="laTelegram"
            :loading="loading.test"
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

        <div class="col" v-if="message.is_copy">
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

        <div class="col" v-if="message.is_generate_default">
          <q-btn
            flat
            class="rounded fit"
            size="md"
            color="red"
            icon="refresh"
            :loading="loading.refresh"
            @click="refreshMessage"
          >
            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Сбросить сообщение
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
import { onBeforeMount, ref } from 'vue';
import { copyToClipboard } from 'quasar';

import { useNotify } from 'src/utils/use/useNotify';
import { useDialog } from 'src/utils/use/useDialog';
import { defaultMessage } from 'src/utils/helpers/defaults';

import SettingCheckbox from './components/SettingCheckbox.vue';
import SettingInput from './components/SettingInput.vue';
import SettingDate from './components/SettingDate.vue';
import SettingDateTime from './components/SettingDateTime.vue';
import PanelHeader from './components/PanelHeader.vue';

import { laTelegram } from '@quasar/extras/line-awesome';
import { fetchSettings } from './query';

const props = withDefaults(defineProps<MessageFreeSettingProps>(), {
  message: () => defaultMessage,
  label: 'Настройки сообщения',
  icon: 'tune',
  noHeader: false,
  noSettings: false,
  botName: '',
  host: '',
  botId: 0,
  token: '',
});

const emit = defineEmits<{
  (e: 'update-type', callback?: () => void): void;
  (e: 'refresh', callback?: () => void): void;
  (e: 'test', callback?: () => void): void;
}>();

const settings = ref<Array<MessageFreeSettingsItem>>([]);
const effects = ref([]);
const data = ref({ bot_id: 0, id: 0 });
const loading = ref({
  setting: false,
  test: false,
  refresh: false,
});

const update = (value: boolean) => (loading.value.setting = value);

const copy = () => {
  copyToClipboard(
    'https://t.me/' + props.botName + '?start=f_' + props.message.id
  ).then(() => {
    useNotify('Ссылка скопированна!');
  });
};

const refreshMessage = () => {
  useDialog('Вы уверены, что хотите сбросить сообщение?', true).onOk(() => {
    loading.value.refresh = true;

    emit('refresh', () => (loading.value.refresh = false));
  });
};

const sendTestMessage = () => {
  loading.value.test = true;

  emit('test', () => (loading.value.test = false));
};

const updateSettings = (key: string, value: boolean) => {
  const setting = settings.value.find((item) => item.key === key);

  if (setting) {
    setting.value = value;

    const mappedSettings = Object.fromEntries(
      settings.value.map((item) => [item.key, item.value])
    );

    loading.value.setting = true;

    fetchSettings(
      props.host,
      'update-settings',
      Object.assign(data.value, mappedSettings),
      props.token,
      (response) => {
        settings.value = response;
      }
    ).then(() => (loading.value.setting = false));
  }
};

onBeforeMount(() => {
  data.value.id = props.message.id;
  data.value.bot_id = props.botId;

  if (props.noSettings) return;

  loading.value.setting = true;

  Promise.all([
    fetchSettings(
      props.host,
      'settings',
      data.value,
      props.token,
      (response) => {
        settings.value = response;
      }
    ),
    fetchSettings(
      props.host,
      'get-effects',
      data.value,
      props.token,
      (response) => {
        effects.value = response;
      }
    ),
  ]).then(() => (loading.value.setting = false));
});

const components = {
  checkbox: SettingCheckbox,
  input: SettingInput,
  date: SettingDate,
  date_time: SettingDateTime,
};

interface MessageFreeSettingProps {
  message: MessageFree;
  botName: string;
  host: string;
  botId: number;
  token: string;
  label?: string;
  icon?: string;
  noHeader?: boolean;
  noSettings?: boolean;
}
</script>

<style scoped lang="scss"></style>
