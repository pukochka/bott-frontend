<template>
  <div class="bott-page__subtitle">Настройки</div>

  <view-buttons
    :buttons="controlProductsButtons"
    col-classes="col-12 col-sm-4"
  ></view-buttons>

  <control-products-menu></control-products-menu>
</template>

<script lang="ts" setup>
import {
  mdiArchiveArrowDown,
  mdiTuneVariant,
  mdiViewDashboard,
} from '@quasar/extras/mdi-v7';

import ViewButtons from 'src/components/views/ViewButtons.vue';
import ControlProductsMenu from 'src/modules/control-products-menu/ControlProductsMenu.vue';

const controlProductsButtons = [
  {
    label: 'Шаблоны',
    icon: mdiViewDashboard,
    link: '',
  },
  {
    label: 'Настройки',
    icon: mdiTuneVariant,
    link: '',
  },
  {
    label: 'Архив',
    icon: mdiArchiveArrowDown,
    link: '',
  },
];
</script>

<style lang="scss" scoped></style>
