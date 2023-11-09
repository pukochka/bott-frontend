<template>
  <div class=""></div>

  <div class="row">
    <router-link to="/buy" class="text-color--warning col-12 col-md-6">
      <div
        class="row justify-between rounded outline--warning q-pa-xs"
        v-clickable
      >
        <div class="">Тариф - безлимитный</div>

        <div class="">Оплачен до - 2023-06-27 (Осталось: 19 д.)</div>
      </div>
    </router-link>
  </div>

  <div class="">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <view-buttons
          col-classes="col-12 col-sm-6"
          row-classes="q-col-gutter-sm"
          btn-classes="q-pa-sm"
          :buttons="premiumButtons"
        ></view-buttons>
      </div>

      <div class="col-12 col-md-6">
        <div class="q-gutter-y-sm">
          <div class="bott-page__subtitle">Дизайн разделов</div>

          <view-buttons
            col-classes="col-12 col-sm-6"
            row-classes="q-col-gutter-sm"
            btn-classes="q-pa-sm"
            :buttons="designButtons"
          ></view-buttons>
        </div>
      </div>
    </div>
  </div>

  <div class="bott-note__block bott-note__block-success border__wide font-14">
    <div class="bott-note__title">Применчание</div>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex
      minus molestiae placeat quasi, repudiandae similique! Aut enim facilis
      fuga quibusdam sequi? Dignissimos doloremque, excepturi facilis iste nihil
      officia sint.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex
      minus molestiae placeat quasi, repudiandae similique! Aut enim facilis
      fuga quibusdam sequi? Dignissimos doloremque, excepturi facilis iste nihil
      officia sint.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { designButtons } from 'src/content/premium/design';

import ViewButtons from 'src/components/views/ViewButtons.vue';

import {
  mdiMenu,
  mdiVectorPolygon,
  mdiViewModule,
  mdiMessageOutline,
  mdiIpNetwork,
  mdiApplicationOutline,
} from '@quasar/extras/mdi-v7';

const premiumButtons = [
  {
    label: 'Управление основным меню',
    icon: mdiMenu,
    link: '/control-panel/premium/control-menu',
  },
  {
    label: 'Управление сценариями',
    icon: mdiVectorPolygon,
    link: '/control-panel/premium/scenarios',
  },
  {
    label: 'Свободные сообщения',
    icon: mdiMessageOutline,
    link: '/control-panel/premium/messages',
  },
  {
    label: 'Модули доступа',
    icon: mdiViewModule,
    link: '/control-panel/premium/modules',
  },
  {
    label: 'Настройка WEB модулей',
    icon: mdiApplicationOutline,
    link: '/control-panel/premium/web-modules',
  },
  {
    label: 'Контроль IP адресов',
    icon: mdiIpNetwork,
    link: '/control-panel/premium/control-ip',
  },
];
</script>

<style lang="scss" scoped></style>
