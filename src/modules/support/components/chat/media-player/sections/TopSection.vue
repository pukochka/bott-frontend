<template>
  <div>
    <div class="row">
      <div class="column q-pl-md">
        <div
          style="line-height: 22px"
          class="text-weight-bold text-subtitle1 text-white ellipsis"
        >
          {{ name }}
        </div>

        <div class="text-caption text-grey-4">{{ time }}</div>
      </div>
    </div>

    <q-space></q-space>

    <q-btn flat round size="md" icon="more_vert" color="white" v-if="!sm">
      <q-menu class="bott-portal-menu">
        <q-list dense separator>
          <q-item
            clickable
            v-show="button.video"
            v-for="(button, index) of buttons"
            :key="index"
            @click="button.action"
          >
            <q-item-section avatar>
              <q-icon :name="button.icon" size="22px" color="primary" />
            </q-item-section>

            <q-item-section>{{ button.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn
      flat
      round
      size="md"
      color="white"
      v-for="(button, index) of buttons"
      :key="index"
      :icon="button.icon"
      v-show="button.video && button.visible"
      @click="button.action"
    >
      <q-tooltip class="bott-tooltip" anchor="bottom middle" self="top middle">
        {{ button.label }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { historyGo } from 'src/utils/helpers/string';
import { useSupportStore } from '../../../../stores/supportStore';
import { date, useQuasar } from 'quasar';

import { mdiMagnifyPlus, mdiMagnifyMinus } from '@quasar/extras/mdi-v7';

const emit = defineEmits<{
  (e: 'zoom-in'): void;
  (e: 'zoom-out'): void;
}>();

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => !quasar.screen.lt.sm);

const name = computed(
  () =>
    support.selectedMessage?.user?.first_name +
    ' ' +
    support.selectedMessage?.user?.last_name
);

const time = computed(() =>
  date.formatDate(
    Date.parse(support.selectedMessage?.created_at ?? ''),
    'HH:mm'
  )
);

const buttons = computed(() => [
  {
    label: 'Скачать',
    icon: 'download',
    action: () => historyGo(support.media.link, true),
    video: true,
    visible: sm.value,
  },
  {
    label: 'Уменьшить',
    icon: mdiMagnifyMinus,
    action: () => emit('zoom-out'),
    video: !support.media.isVideo,
    visible: sm.value,
  },
  {
    label: 'Увеличить',
    icon: mdiMagnifyPlus,
    action: () => emit('zoom-in'),
    video: !support.media.isVideo,
    visible: sm.value,
  },
  {
    label: 'Закрыть',
    icon: 'close',
    action: () => (support.dialogs.media_player = false),
    video: true,
    visible: true,
  },
]);
</script>

<style scoped lang="scss">
.bg-black--gradient {
  background: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
