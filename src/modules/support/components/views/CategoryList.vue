<template>
  <div class="row relative-position" ref="table">
    <div style="width: 100%">
      <q-scroll-area
        :style="{ height: `calc(100vh - 80px - ${support.offsetTop}px)` }"
        :thumb-style="thumbStyle"
      >
        <q-table
          square
          hide-bottom
          virtual-scroll
          row-key="id"
          selection="multiple"
          class="bg-transparent no-shadow q-pa-none fit sticky-virtual-scroll-table"
          :rows-per-page-options="[0]"
          :grid="support.view === 'grid'"
          :rows="tickets"
          :columns="columns"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                no-hover
                auto-width
                @mouseenter="updateHover(props.row, true)"
                @mouseleave="updateHover(props.row, false)"
                class="bott-page__background"
              >
                <div class="row no-wrap items-center q-gutter-x-xs">
                  <q-btn
                    flat
                    padding="4px"
                    color="primary"
                    class="rounded"
                    icon="more_vert"
                    @click="support.selectedTicket = props.row"
                  >
                    <q-tooltip
                      class="bott-tooltip text-center"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      Действия
                    </q-tooltip>

                    <q-menu class="bott-portal-menu">
                      <ticket-menu :ticket="props.row"></ticket-menu>
                    </q-menu>
                  </q-btn>

                  <table-buttons :ticket="props.row"></table-buttons>
                </div>
              </q-td>

              <q-td
                class="cursor-pointer"
                :auto-width="col?.autoWidth"
                v-for="col of props.cols"
                :key="props.row[col.name]"
                :class="[' text-' + (col.align ?? 'center')]"
                @click="support.openChat(props.row)"
              >
                <ticket-status
                  :status="props.row.status"
                  v-if="col.name === 'status'"
                ></ticket-status>

                <table-user-view
                  :implementer="col.name === 'executor'"
                  :ticket="props.row"
                  v-else-if="['executor', 'name'].includes(col.name)"
                ></table-user-view>

                <div
                  class="font-14"
                  :style="col?.style"
                  :class="col?.classes"
                  v-else
                >
                  {{ col?.field(props.row) }}
                </div>
              </q-td>
            </q-tr>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width> </q-th>

              <q-th
                :props="props"
                :auto-width="col?.autoWidth"
                :style="col?.style"
                v-for="col of props.cols"
                :key="col.name"
              >
                <div class="text-subtitle1 text-white">{{ col.label }}</div>
              </q-th>
            </q-tr>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <ticket-grid-item :props="props"></ticket-grid-item>
            </div>
          </template>
        </q-table>
      </q-scroll-area>

      <div
        style="z-index: 5"
        class="text-center col q-pa-xl bott-page__background absolute-full"
        v-if="!tickets.length"
      >
        Тикетов в категории
        <span class="text-primary">
          {{ support.selectedCategory?.title ?? '' }}
        </span>
        пока нет...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { columns } from '../../utils/columns';

import { useSupportStore } from '../../stores/supportStore';

import TicketGridItem from '../items/TicketGridItem.vue';
import TicketMenu from '../items/sections/TicketMenu.vue';
import TicketStatus from '../items/sections/TicketStatusTable.vue';
import TableUserView from '../items/sections/TableUserView.vue';
import TableButtons from '../items/sections/TableButtons.vue';

const support = useSupportStore();

const table = ref();
const hover = ref(false);

const tickets = computed(() => support.tickets);
const updateHover = (row: any, val: boolean) => {
  hover.value = val;

  row.hover = !val;
};

const thumbStyle = {
  height: '6px',
  width: '6px',
  margin: '2px',
  background: 'var(--q-primary)',
};
</script>

<style lang="scss">
.text-wrap {
  white-space: normal !important;
}
</style>
