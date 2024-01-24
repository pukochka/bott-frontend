<template>
  <div class="q-mx-md" v-if="!['create', 'select'].includes(support.section)">
    <div class="row items-center justify-between relative-position">
      <div class="" v-if="sm">
        <q-btn
          square
          flat
          size="md"
          color="primary"
          icon="more_vert"
          :padding="padding"
        >
          <q-menu class="bott-portal-menu">
            <q-list dense>
              <q-item
                clickable
                v-for="(button, index) of categoryButtons"
                :key="index"
                v-show="button.condition"
                @click="button.action"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="button.icon"
                    :color="button.color"
                    size="26px"
                  />
                </q-item-section>

                <q-item-section>{{ button.label }}</q-item-section>

                <q-inner-loading :showing="button.loading">
                  <q-spinner size="36px" color="primary" />
                </q-inner-loading>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="row no-wrap" v-else>
        <q-btn
          dense
          no-caps
          square
          flat
          :padding="padding"
          :icon="button.icon"
          :color="button.color"
          v-show="button.condition"
          :loading="button.loading"
          @click="button.action"
          v-for="(button, index) of categoryButtons"
          :key="index"
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

      <div class="row no-wrap">
        <top-tune-menu></top-tune-menu>

        <q-btn
          flat
          square
          :padding="padding"
          color="primary"
          icon="close"
          @click="support.closeSection"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Закрыть
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { useQuasar } from 'quasar';

import TopTuneMenu from './TopTuneMenu.vue';

import {
  mdiAccountTie,
  mdiEyeOutline,
  mdiStickerOutline,
  mdiApplicationParentheses,
} from '@quasar/extras/mdi-v7';

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);
const padding = computed(() => (sm.value ? '4px 16px' : '6px 32px'));

const categoryButtons = computed(() => [
  {
    label: 'Просмотр тикетов',
    icon: mdiStickerOutline,
    action: () => (support.section = 'list'),
    color: 'primary',
    condition: support.selectedCategory !== null && support.section !== 'list',
    loading: false,
  },
  {
    label: 'Просмотр исполнителей категории',
    icon: mdiAccountTie,
    action: () => (support.section = 'manager'),
    color: 'accent',
    condition: true,
    loading: false,
  },
  {
    label: 'Просмотр лога категории',
    icon: mdiEyeOutline,
    action: () => (support.section = 'log'),
    color: 'orange',
    condition: true,
    loading: false,
  },
  {
    label: 'Редактирование категории',
    icon: 'edit',
    action: () => (support.section = 'edit'),
    color: 'secondary',
    condition: true,
    loading: false,
  },
]);
</script>

<style scoped lang="scss">
.rounded-bottom {
  border-radius: 0 0 10px 10px;
}
</style>
