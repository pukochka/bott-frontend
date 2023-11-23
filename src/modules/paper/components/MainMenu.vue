<template>
  <q-card
    bordered
    flat
    square
    class="row absolute-top q-mx-xxl overflow-hidden"
  >
    <div class="col" v-for="(button, index) of buttons" :key="index">
      <q-btn
        square
        no-caps
        flat
        class="fit"
        size="13px"
        :icon="button.icon"
        :color="button.color"
        :label="button.label"
      />
    </div>

    <div class="absolute-full" v-if="disabled"></div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePSStore } from '../stores/PSstore';
import {
  mdiBellCog,
  mdiForum,
  mdiMessageSettings,
} from '@quasar/extras/mdi-v7';

const store = usePSStore();

const disabled = computed(
  () => store.onconnection || store.dragging || store.onmessage
);

const buttons = computed(() => [
  {
    label: 'Смотреть ответы',
    action: '',
    icon: mdiForum,
    color: 'primary',
  },
  {
    label: 'Настройки уведомлений для администраторов',
    action: '',
    icon: mdiBellCog,
    color: 'primary',
  },
  {
    label: 'Настройки обратной связи',
    action: '',
    icon: mdiMessageSettings,
    color: 'primary',
  },
]);
</script>

<style scoped lang="scss">
.q-mx-xxl {
  margin-left: 170px;
  margin-right: 170px;
}
</style>
