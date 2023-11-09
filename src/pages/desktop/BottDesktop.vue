<template>
  <div class="row">
    <q-btn
      outline
      no-caps
      size="lg"
      class="col rounded"
      color="primary"
      :label="t('my-bots')"
      to="/my-bots"
    />
  </div>

  <div class="bott-page__subtitle">Создать нового бота</div>

  <div class=""></div>

  <div class="row q-col-gutter-lg">
    <div class="col-12 col-sm-6" v-for="item in bots" :key="item.title">
      <q-card
        class="border__wide fit column"
        :class="['bott-note__block-' + item?.color ?? 'b']"
        flat
        bordered
      >
        <q-card-section class="row items-center no-wrap q-gutter-x-md">
          <q-icon :name="item.icon" size="32px" />

          <div class="text-h6">{{ item.title }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-caption">{{ item.desc }}</div>
        </q-card-section>

        <q-space />

        <q-card-section class="row">
          <q-btn
            flat
            align="left"
            class="rounded col"
            size="md"
            :icon="mdiLaunch"
            label="Создать"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from 'src/boot/lang';
import {
  mdiCellphone,
  mdiAccountSupervisor,
  mdiBasket,
  mdiCropFree,
  mdiApplicationEdit,
  mdiFaceAgent,
  mdiLaunch,
} from '@quasar/extras/mdi-v7';

const bots: {
  title: string;
  desc: string;
  icon: any;
  color?: string;
  isNew?: boolean;
}[] = [
  {
    title: 'Бот цифровых товаров-автовыдача (без корзины)',
    desc: 'Продавайте ваши цифровые товары! Подходит для ключей,файлов, курсов, аккаунтов, программ, NFT и т.д. Бот сам проверит оплату и выдаст товар, без вашего участия',
    icon: mdiCellphone,
    color: 'negative',
    isNew: true,
  },
  {
    title: 'Бот подписок',
    desc:
      'Если вы хотите создать свой закрытый чат/канал(Ресурс)\n' +
      'Принимать оплату за доступ к ресурсу\n' +
      'Продвигать свой инфо-продукт\n' +
      'Включить модуль обязательной подписки на канал/чат\n' +
      'Включить модуль доступа в бота по паролю/капче\n' +
      'Создать отслеживаемые ссылки(трафик)\n' +
      'Создать многоуровневую реферальную систему в боте\n' +
      'Делать рассылку по пользователям\n' +
      'Сделать доступ по подписке(Автоплатежи)\n' +
      'Создать группу ресурсов и принимать сразу в несколько каналов(сетку) за один платеж\n' +
      'Создать скидочные промокоды',
    icon: mdiAccountSupervisor,
    color: 'warning',
  },
  {
    title: 'Бот Физических товаров',
    desc:
      'Если вы хотите продавать любой товар который есть в мире\n' +
      'Принимать фиксированную оплату за товар\n' +
      'Включить модуль обязательной подписки на канал/чат\n' +
      'Включить модуль доступа в бота по паролю/капче\n' +
      'Создать отслеживаемые ссылки(трафик)\n' +
      'Создать многоуровневую реферальную систему в боте\n' +
      'Делать рассылку по пользователям\n' +
      'Принимайте заказы и обрабатывайте их\n' +
      'Создать скидочные промокоды\n' +
      'Добавить готовые WEB модули',
    icon: mdiBasket,
    color: 'primary',
  },
  {
    title: 'Свободный бот',
    desc: 'Создавайте бота если вам нужны простые настройки и удобное управление командами. Без лишних сложных модулей.',
    icon: mdiCropFree,
    color: 'success',
  },
  {
    title: 'Бот приема заявок в канал',
    desc: 'После отправки заявки в канал, бот автоматически её примет или отклонит. Также бот получит права на отправку сообщений клиенту. Пример ссылки: https://t.me/+6HM9qhdpou8yMTAy',
    icon: mdiApplicationEdit,
    color: 'prism',
  },
  {
    title: 'Бот технической поддержки',
    desc: 'Бот технической поддержки — это упорядоченная и организация деятельности с возможность распределения входящих обращений по группам и исполнителям.',
    icon: mdiFaceAgent,
  },
];
</script>
