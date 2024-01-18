<template>
  <div class="row relative-position" ref="table">
    <div style="width: 100%">
      <q-scroll-area
        :style="{
          maxHeight: height + 'px',
          minHeight: height + 'px',
          height: height + 'px',
        }"
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
          :grid="work.view === 'grid'"
          v-model:rows="tickets"
          v-model:columns="columns"
          v-model:selected="work.selected"
        >
          <template v-slot:header-selection="scope">
            <q-checkbox dense v-model="scope.selected" />
          </template>

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
                  <q-checkbox dense v-model="props.selected" />

                  <q-btn
                    flat
                    padding="4px"
                    color="primary"
                    class="rounded"
                    icon="more_vert"
                  >
                    <q-tooltip
                      class="bott-tooltip text-center"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      Действия
                    </q-tooltip>

                    <q-menu class="bott-portal-menu">
                      <ticket-menu></ticket-menu>
                    </q-menu>
                  </q-btn>

                  <q-btn
                    flat
                    padding="4px"
                    color="positive"
                    class="rounded"
                    :icon="mdiBriefcase"
                  >
                    <q-tooltip
                      class="bott-tooltip text-center"
                      anchor="top middle"
                      self="bottom middle"
                    >
                      Взять в работу
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-td>

              <q-tooltip
                @update:model-value="(val) => notHover(val, props.row)"
                :model-value="props.row.hover"
                class="bott-tooltip text-center"
                anchor="top middle"
                self="bottom middle"
              >
                Перейти в чат
              </q-tooltip>

              <q-td
                class="cursor-pointer"
                :auto-width="col?.autoWidth"
                v-for="col of props.cols"
                :key="props.row[col.name]"
                :class="[' text-' + (col.align ?? 'center')]"
                @click="work.chat = true"
              >
                <ticket-status
                  :status="props.row.status"
                  v-if="col.name === 'status'"
                ></ticket-status>

                <table-user-view
                  :value="
                    col.name === 'executor'
                      ? props.row?.manager?.link
                      : props.row?.user?.link
                  "
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
              <q-th auto-width>
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :color="
                    props.selected || work.selected.length ? 'info' : 'white'
                  "
                  keep-color
                ></q-checkbox>
              </q-th>

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

        <div
          style="z-index: 5"
          class="text-center col q-pa-xl bott-page__background absolute-full"
          v-if="!tickets.length"
        >
          Тикетов в категории
          <span class="text-primary">
            {{ work.selectedCategory?.title ?? '' }}
          </span>
          пока нет...
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { columns } from '../../utils/columns';

import { useWorkStore } from '../../stores/workStore';

import TicketGridItem from '../items/TicketGridItem.vue';
import TicketMenu from '../items/sections/TicketMenu.vue';
import TicketStatus from '../items/sections/TicketStatusTable.vue';
import TableUserView from '../items/sections/TableUserView.vue';

import { mdiBriefcase } from '@quasar/extras/mdi-v7';

const work = useWorkStore();

const table = ref();
const height = ref(300);
const hover = ref(false);

const tickets = computed(() => work.tickets);

const updateHover = (row: any, val: boolean) => {
  hover.value = val;

  row.hover = !val;
};

const notHover = (val: any, row: any) => {
  if (hover.value) {
    row.hover = false;
    return;
  }

  row.hover = val;
};

onMounted(() => {
  height.value =
    window.innerHeight -
    60 -
    (table.value?.$el?.getBoundingClientRect().y ?? 300);
});

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
