<template>
  <div class="absolute-top" :class="[sm ? ' q-mx-xxl' : ' q-mt-xxl q-mx-sm']">
    <q-card
      bordered
      flat
      :square="!sm"
      class="overflow-hidden"
      :class="[sm ? ' row' : ' column rounded']"
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
          @click="button.action"
        />
      </div>

      <div class="absolute-full" v-if="disabled"></div>
    </q-card>

    <warning-start warning></warning-start>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';

import {
  mdiBellCog,
  mdiForum,
  mdiMessageSettings,
} from '@quasar/extras/mdi-v7';

import WarningStart from '../views/WarningStart.vue';
import { useQuasar } from 'quasar';

const store = useFeedbackStore();
const quasar = useQuasar();

const sm = computed(() => !quasar.screen.lt.sm);

const disabled = computed(() => store.onconnection || store.dragging);

const buttons = computed(() => [
  {
    label: 'Смотреть ответы',
    action: () => store.openDialog('answers'),
    icon: mdiForum,
    color: 'primary',
  },
  {
    label: 'Настройки уведомлений для администраторов',
    action: () => store.openDialog('notify'),
    icon: mdiBellCog,
    color: 'primary',
  },
  {
    label: 'Настройки обратной связи',
    action: () => store.openDialog('settings'),
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

.q-mt-xxl {
  margin-top: 52px;
}
</style>
