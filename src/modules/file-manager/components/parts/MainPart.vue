<template>
  <q-scroll-area style="height: calc(100vh / 2); width: 100%" class="q-pa-sm">
    <div
      class="relative-position rounded overflow-hidden"
      :class="[sortBy ? ' q-pb-md' : '']"
    >
      <div class="" v-if="data.loadCount">
        <div class="row q-col-gutter-sm">
          <file-card
            v-for="file of paginated"
            :key="file.link"
            :item="file"
          ></file-card>
        </div>
      </div>
    </div>

    <div class="absolute-bottom row full-width justify-center" v-if="sortBy">
      Включен фильтр
    </div>

    <notify-section></notify-section>

    <q-inner-loading :showing="data.loadings.index" transition-show="fade">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useFileStore } from '../../stores/fileStore';

import NotifySection from '../sections/NotifySection.vue';
import FileCard from '../FileCard.vue';

const data = useFileStore();

const sortBy = computed(
  () => Object.values(data.sortable).includes(!null) || data.tabs !== 'all'
);

const paginated = computed(() =>
  data.files.filter(
    (_, index) =>
      index < data.pagination.count * data.pagination.page &&
      index >=
        data.pagination.count * data.pagination.page - data.pagination.count
  )
);
</script>

<style scoped lang="scss"></style>
