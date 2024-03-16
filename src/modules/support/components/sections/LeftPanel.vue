<template>
  <div class="overflow-hidden">
    <div style="overflow: hidden scroll" :style="style">
      <q-list class="overflow-hidden">
        <ticket-item
          v-for="ticket in support.tickets"
          :key="ticket.id"
          :ticket="ticket"
        ></ticket-item>
      </q-list>
    </div>
  </div>

  <bottom-section
    v-if="support.pagination.count > 25 && !support.loading.category"
  ></bottom-section>

  <div
    class="absolute-center"
    v-if="
      !support.tickets.length &&
      !support.loading.category &&
      support.selectedCategory
    "
  >
    <q-chip
      label="В категории пока нет тикетов..."
      text-color="white"
      color="grey"
      size="lg"
    >
    </q-chip>
  </div>

  <div
    class="absolute-center"
    v-if="
      !support.tickets.length &&
      !support.loading.category &&
      !support.selectedCategory
    "
  >
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
import { useSupportStore } from '../../stores/supportStore';

import TicketItem from '../items/TicketItem.vue';
import BottomSection from './BottomSection.vue';
import { computed } from 'vue';

const support = useSupportStore();

const style = computed(
  () =>
    `height: calc(100vh - ${support.pagination.count > 25 ? 36 : 0}px - ${
      support.offsetTop
    }px)`
);
</script>

<style scoped lang="scss">
.bg-opacity--red {
  background: rgba(255, 0, 0, 0.2);
}
</style>
