<template>
  <div class="" v-for="(notify, index) of notifies" :key="index">
    <transition name="q-transition--fade">
      <div
        class="q-pa-xl flex flex-center absolute-full"
        v-if="notify.condition"
      >
        <div class="column items-center q-gutter-y-sm">
          <q-icon :name="notify.icon" color="primary" size="32px" />

          <div class="text-h6 text-center">{{ notify.text }}</div>

          <q-btn
            v-if="notify.text !== 'В хранилище пока что нет файлов...'"
            dense
            flat
            no-caps
            class="rounded"
            color="primary"
            label="Очистить фильтр"
            @click="disableFilter"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useFMStore } from '../../stores/FMStrore';

import { mdiEmoticonSadOutline } from '@quasar/extras/mdi-v7';

const data = useFMStore();

const disableFilter = () => {
  data.search = '';
  data.tabs = 'all';
  data.sortable.date = null;
  data.sortable.size = null;
};

const notifies = computed(() => [
  {
    text: 'Ничего не нашлось...',
    condition:
      !data.files.length &&
      !data.loadings.index &&
      data.loadCount &&
      data.search !== '',
    icon: 'search',
  },
  {
    text: 'В хранилище пока что нет файлов...',
    condition: !data.loadCount && !data.loadings.index,
    icon: mdiEmoticonSadOutline,
  },
  {
    text: 'Используемых файлов нет',
    condition: !data.files.length && data.tabs === 'used' && data.search === '',
    icon: 'search',
  },
  {
    text: 'Не используемых файлов нет',
    condition:
      !data.files.length && data.tabs === 'not-used' && data.search === '',
    icon: 'search',
  },
]);
</script>

<style scoped lang="scss"></style>
