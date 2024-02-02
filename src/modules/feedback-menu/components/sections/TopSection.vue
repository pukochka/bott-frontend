<template>
  <div
    class="absolute-top"
    :class="[sm ? ' q-mx-xxl q-mt-sm' : ' q-mt-xxl q-mx-sm']"
  >
    <div class="row justify-center">
      <q-card
        bordered
        flat
        class="overflow-hidden rounded"
        :class="[sm ? ' col-6' : 'col-10']"
      >
        <div class="text-body2 q-pa-xs">
          <q-breadcrumbs>
            <q-breadcrumbs-el
              v-clickable
              class="rounded q-px-xs text-primary"
              v-for="(breadcrumb, index) of breadcrumbs"
              :key="index"
              :href="breadcrumb.link"
              :label="breadcrumb.label"
            />

            <q-breadcrumbs-el
              class="rounded q-px-xs"
              :label="feedback.message.title"
            />
          </q-breadcrumbs>
        </div>

        <div :class="[sm ? ' row' : ' column rounded']">
          <div class="col" v-for="(button, index) of buttons" :key="index">
            <q-btn
              square
              no-caps
              flat
              class="fit"
              size="13px"
              :icon="button.icon"
              :color="button.color"
              :label="sm ? '' : button.label"
              @click="button.action"
            >
              <q-tooltip
                v-if="sm"
                class="bott-tooltip text-center"
                anchor="bottom middle"
                self="top middle"
              >
                {{ button.label }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>

        <div class="absolute-full" v-if="disabled"></div>
      </q-card>
    </div>

    <warning-start v-if="!feedback.isMobile && !md"></warning-start>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { useQuasar } from 'quasar';

import {
  mdiApi,
  mdiBellCog,
  mdiForum,
  mdiMessageSettings,
} from '@quasar/extras/mdi-v7';

import WarningStart from '../views/WarningStart.vue';

const feedback = useFeedbackStore();
const quasar = useQuasar();

const sm = computed(() => !quasar.screen.lt.sm);
const md = computed(() => quasar.screen.lt.md);

const disabled = computed(() => feedback.onconnection || feedback.dragging);

const breadcrumbs = computed(() => feedback.message?.breadcrumbs?.crumbs);

const buttons = computed(() => [
  {
    label: 'Смотреть заявки',
    action: () => feedback.openDialog('answers'),
    icon: mdiForum,
    color: 'primary',
  },
  {
    label: 'Настройки уведомлений для администраторов',
    action: () => feedback.openDialog('notify'),
    icon: mdiBellCog,
    color: 'primary',
  },
  {
    label: 'Настройки обратной связи',
    action: () => feedback.openDialog('settings'),
    icon: mdiMessageSettings,
    color: 'primary',
  },
  {
    label: 'Готовые интеграции',
    action: () => feedback.openDialog('api'),
    icon: mdiApi,
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
