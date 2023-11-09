<template>
  <div class=""></div>

  <div class="row q-col-gutter-md">
    <div class="col-12 col-sm-6 q-gutter-y-md">
      <div class="bott-page__subtitle">Настройки</div>

      <q-list
        dense
        bordered
        separator
        class="rounded overflow-hidden non-selectable"
      >
        <q-item
          clickable
          v-ripple
          tag="label"
          v-for="(item, index) in settings"
          :key="index"
        >
          <q-item-section>
            <q-item-label>
              {{ item.label }}
            </q-item-label>
          </q-item-section>

          <q-toggle v-model="teal" />
        </q-item>
      </q-list>
    </div>

    <div class="col-12 col-sm-6 q-gutter-y-md">
      <div class="bott-page__subtitle">Часовой пояс бота</div>

      <q-select
        v-model="selectedTime"
        :options="Object.values(timezone)"
        outlined
        dense
        popup-content-class="bott-portal-menu"
        options-dense
        class="bott-input--rounded"
      />
    </div>

    <div class="col-12 col-sm-6 q-gutter-y-md">
      <div class="bott-page__subtitle">Язык в боте</div>

      <q-select
        v-model="selectedLang"
        :options="lang"
        outlined
        dense
        popup-content-class="bott-portal-menu"
        options-dense
        class="bott-input--rounded"
      />

      <q-list
        bordered
        separator
        dense
        class="rounded overflow-hidden non-selectable"
      >
        <q-item clickable v-ripple tag="label" class="rounded">
          <q-item-section>
            <q-item-label>
              Сбросить настройки при смене языка?(меню, сообщения и др.)
            </q-item-label>
          </q-item-section>

          <q-toggle v-model="teal" />
        </q-item>
      </q-list>
    </div>

    <div class="col-12 col-sm-6 q-gutter-y-md">
      <div class="bott-page__subtitle">Валюта в боте</div>

      <q-select
        v-model="selectedCurrency"
        :options="Object.values(currency)"
        outlined
        dense
        popup-content-class="bott-portal-menu"
        options-dense
        class="bott-input--rounded"
      />

      <div
        class="bott-note__block-negative border__wide rounded-borders q-px-md q-py-sm font-14"
      >
        <div class="text-color--negative font-16 q-py-xs">Примечание</div>

        Если у пользователей есть баланс, необходимо его изменить в ручную или
        обнулить. Изменение основной валюты в боте - это очень ответственный
        шаг. Статистика будет работать некорректно. Не рекомендуется менять
        валюту в боте, или обнулить все прошлые сделки/транзакции и т.д.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { currency, timezone } from 'src/content/views';

const teal = ref(false);
const selectedTime = ref(1);
const selectedLang = ref(1);
const selectedCurrency = ref(1);

const settings = [
  {
    label: 'Бот включен',
    value: false,
  },
  {
    label: 'Уведомления о новых пользователях',
    value: false,
  },
  {
    label: 'Уведомления о новых заказах',
    value: false,
  },
];

const lang = ['Русский', 'English'];
</script>

<style lang="scss" scoped></style>
