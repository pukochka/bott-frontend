<template>
  <div class="row q-col-gutter-md relative-position q-px-md">
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
      v-model:rows="tickets"
      v-model:columns="columns"
      v-model:selected="selected"
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
            v-for="col of props.cols"
            :key="props.row[col.name]"
            class="cursor-pointer"
            @click="work.chat = true"
            :auto-width="col?.autoWidth"
            :class="[' text-' + (col.align ?? 'center')]"
          >
            <div class="font-14">{{ col?.field(props.row) }}</div>
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
          >
            <div class="text-subtitle1 text-white">{{ col.label }}</div>
          </q-th>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useWorkStore } from '../../stores/workStore';
import { mdiBriefcase } from '@quasar/extras/mdi-v7';

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
];
</script>

<style lang="scss"></style>
