<template>
  <div class="row relative-position">
    <div class="text-center col q-pa-xl" v-if="!tickets.length">
      Тикетов в категории
      <span class="text-primary">
        {{ work.selectedCategory?.label ?? '' }}
      </span>
      пока нет...
    </div>

    <q-table
      v-else
      square
      style="max-height: 400px"
      hide-bottom
      virtual-scroll
      row-key="id"
      selection="multiple"
      class="bg-transparent no-shadow q-pa-none fit sticky-virtscroll-table"
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
              :color="props.selected || selected.length ? 'info' : 'white'"
              keep-color
            ></q-checkbox>
          </q-th>

          <q-th
            class="q-pa-none"
            v-for="col of props.cols"
            :key="col.name"
            :props="props"
            :auto-width="col?.autoWidth"
            :style="col?.style"
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWorkStore } from '../../stores/workStore';
import { mdiBriefcase } from '@quasar/extras/mdi-v7';
import TicketGridItem from '../items/TicketGridItem.vue';
import TicketMenu from '../items/sections/TicketMenu.vue';
import TicketStatus from '../items/sections/TicketStatus.vue';

const work = useWorkStore();

const selected = ref([]);
const hover = ref(false);

const tickets = computed(
  () =>
    work.categories.filter((item) => item.id === work.selectedCategory?.id)?.[0]
      ?.tickets
);

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

const columns: Array<any> = [
  {
    autoWidth: true,
    name: 'id',
    align: 'left',
    label: 'Название',
    field: (row: any) => 'Тикет №' + row.id,
    hover: false,
  },
  {
    autoWidth: true,
    name: 'message',
    align: 'center',
    label: 'Сообщение',
    classes: 'ellipsis-3-lines text-wrap',
    style: 'min-width: 200px',
    field: () =>
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus distinctio eum omnis quibusdam. Amet aspernatur blanditiis deserunt distinctio dolorem dolorum eos maiores minus necessitatibus, optio placeat provident recusandae reiciendis sint?',
    hover: false,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: (row: any) => row.status,
    hover: false,
  },
  {
    name: 'executor',
    align: 'center',
    label: 'Исполнитель',
    field: (row: any) => row.executor,
    hover: false,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Запрос от',
    field: (row: any) => row.name,
    hover: false,
  },
  {
    name: 'time',
    align: 'center',
    label: 'Время создания',
    field: (row: any) => row.create_at,
    hover: false,
  },
];
</script>

<style lang="scss">
.text-wrap {
  white-space: normal !important;
}
</style>
