<template>
  <search-input></search-input>

  <div class="overflow-hidden relative-position">
    <div style="overflow: hidden scroll" :style="style">
      <q-list class="overflow-hidden">
        <ticket-item
          v-for="ticket in support.tickets"
          :key="ticket.id"
          :ticket="ticket"
        ></ticket-item>
      </q-list>
    </div>

    <bottom-section></bottom-section>

    <search-section></search-section>
  </div>

  <div class="absolute-center" v-if="conditions.emptyCategory">
    <q-chip
      label="В категории пока нет тикетов..."
      text-color="white"
      color="grey"
      size="lg"
    >
    </q-chip>
  </div>

  <div class="absolute-center" v-if="conditions.selectCategory">
    <q-chip
      label="Выберите категорию"
      color="grey"
      text-color="white"
      size="lg"
    >
    </q-chip>
  </div>

  <q-inner-loading
    :showing="support.loading.category"
    class="bott-page__background"
  >
    <div class="full-width">
      <q-item v-for="item in 25" :key="item">
        <q-item-section>
          <q-item-label>
            <div class="row justify-between">
              <q-skeleton type="text" class="col-3" />

              <q-skeleton type="text" class="col-3" />
            </div>
          </q-item-label>

          <q-skeleton type="text" />
        </q-item-section>
      </q-item>
    </div>
  </q-inner-loading>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import TicketItem from '../items/TicketItem.vue';
import BottomSection from './BottomSection.vue';
import SearchSection from '../search/SearchSection.vue';
import SearchInput from '../search/SearchInput.vue';

const support = useSupportStore();

const style = computed(
  () =>
    `height: calc(100vh - ${support.pagination.count > 25 ? 92 : 56}px - ${
      support.offsetTop
    }px)`
);

const conditions = computed(() => ({
  selectCategory:
    !support.tickets.length &&
    !support.loading.category &&
    !support.selectedCategory,
  emptyCategory:
    !support.tickets.length &&
    !support.loading.category &&
    support.selectedCategory,
}));
</script>

<style scoped lang="scss">
.bg-opacity--red {
  background: rgba(255, 0, 0, 0.2);
}
</style>
