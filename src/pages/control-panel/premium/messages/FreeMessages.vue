<template>
  <div class="row">
    <q-btn
      class="rounded col-12"
      outline
      no-caps
      size="md"
      color="primary"
      label="Менеджер файлов"
      to="/control-panel/premium/messages/file-manager"
    />
  </div>

  <div class="bott-page__subtitle">Создать сообщение</div>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          class="bott-input--rounded"
          v-model="model"
          :options="Object.values(options)"
          label="Тип сообщения"
          outlined
          dense
          popup-content-class="bott-portal-menu"
          options-dense
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          unelevated
          size="md"
          color="primary"
          icon="add"
          label="Добавить сообщение"
          no-caps
          class="fit rounded"
        />
      </div>
    </div>
  </div>

  <div class="bott-page__subtitle">Мои сообщения</div>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-4">
        <q-input
          clear-icon="close"
          clearable
          v-model="text"
          label="Поиск по названию..."
          dense
          outlined
          class="bott-input--rounded"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          clear-icon="close"
          clearable
          outlined
          dense
          options-dense
          class="bott-input--rounded"
          popup-content-class="bott-portal-menu"
          v-model="model"
          :options="Object.values(options)"
          label="Поиск по типу сообщения"
        />
      </div>
    </div>
  </div>

  <div class="">
    <div class="row q-col-gutter-sm">
      <div
        class="col-12 col-sm-4 col-md-3"
        v-for="(message, index) of filteredMessages"
        :key="index"
      >
        <router-link to="/control-panel/premium/messages/edit-message">
          <q-card flat bordered class="rounded">
            <q-card-section class="q-pa-sm" v-clickable>
              <q-badge
                color="transparent"
                :class="[
                  ' q-pa-none bott-token text-color--' +
                    options[message.type].color,
                ]"
                :label="options[message.type].label"
              />

              <div class="text-h6">{{ message.label }}</div>

              <div class="bott-text__caption ellipsis-3-lines">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
                beatae corporis explicabo hic iste minus molestias,
                necessitatibus nemo neque obcaecati placeat quis sequi sint
                veniam voluptatum. Magni modi natus nihil.
              </div>

              <q-tooltip
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                Нажмите для редактирования
              </q-tooltip>
            </q-card-section>

            <q-card-section class="row q-col-gutter-x-sm q-pa-sm">
              <div
                class="col-4 row"
                v-for="(button, index) of messageAction"
                :key="index"
              >
                <q-btn
                  flat
                  dense
                  no-caps
                  class="rounded fit"
                  :color="button.color"
                  :icon="button.icon"
                >
                  <q-tooltip
                    class="bott-tooltip text-center"
                    anchor="top middle"
                    self="bottom middle"
                  >
                    {{ button.label }}
                  </q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </router-link>
      </div>
    </div>
  </div>

  <div class="q-pa-lg flex-center flex text-h6">
    <div class="column items-center">
      <q-icon :name="mdiEmoticonSadOutline" color="primary" size="32px" />

      <div class="">У Вас пока нет свободных сообщений</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  mdiEmoticonSadOutline,
  mdiSend,
  mdiContentDuplicate,
} from '@quasar/extras/mdi-v7';

const text = ref('');

const model = ref<number | null>(null);

const options = {
  0: { label: 'Текстовое сообщение', color: 'prism' },
  1: { label: 'Сообщение с картинкой', color: 'success' },
  2: { label: 'Обратная связь', color: 'primary' },
  3: { label: 'Сообщение-файл', color: 'negative' },
  4: { label: 'Сообщение c видео', color: 'warning' },
  5: { label: 'Сообщение c анимацией(gif)', color: 'neutral' },
};

const messages = [
  {
    label: 'Связь с телемагазином',
    type: 2,
  },
  {
    label: 'Продажа ручек',
    type: 4,
  },
  {
    label: 'Реки и дороги',
    type: 3,
  },
  {
    label: 'Горная местность',
    type: 5,
  },
  {
    label: 'Сообщение',
    type: 0,
  },
  {
    label: 'Желание',
    type: 1,
  },
];

const filteredMessages = computed(() =>
  messages.filter((message) => message.label.includes(text.value))
);

const messageAction = [
  {
    label: 'Отправить тестовое сообщение в ЛС',
    icon: mdiSend,
    action: '',
    color: 'green',
  },
  {
    label: 'Дублировать сообщение',
    icon: mdiContentDuplicate,
    action: '',
    color: 'primary',
  },
  {
    label: 'Удалить сообщение',
    icon: 'delete',
    action: '',
    color: 'red',
  },
];
</script>

<style lang="scss" scoped></style>
