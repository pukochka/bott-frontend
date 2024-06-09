<template>
  <q-table
    flat
    row-key="name"
    title="Пользователи"
    :rows="rows"
    :columns="columns"
    selection="multiple"
    card-class="bg-transparent row full-width"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width></q-th>

        <q-th
          v-for="key in breakpoints"
          :key="key"
          :props="props"
          class="ellipsis"
        >
          <div class="text-italic text-body1 text-primary ellipsis">
            {{ props.colsMap[key].label }}
          </div>
        </q-th>

        <q-th auto-width></q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props" no-hover>
        <q-td auto-width>
          <q-checkbox
            dense
            :model-value="table.mapSelected.includes(props.row.id)"
            @update:model-value="table.select(props.row)"
            color="primary"
          />
        </q-td>

        <q-td :props="props" v-for="key in breakpoints" :key="key">
          <div class="ellipsis-2-lines">{{ props.row[key] }}</div>
        </q-td>

        <q-td auto-width>
          <q-btn
            padding="6px"
            flat
            size="md"
            color="primary"
            icon="more_vert"
          />
        </q-td>
      </q-tr>
    </template>

    <template #bottom>
      <q-space></q-space>

      <bottom-pagination :length="rows.length" :step="5"></bottom-pagination>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { config } from './config';
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useTableStore } from './stores/tableStore';

import BottomPagination from 'src/components/bottom/BottomPagination.vue';

const quasar = useQuasar();
const table = useTableStore();

const size = computed(
  () =>
    <'sm' | 'md' | 'lg'>(
      Object.entries(quasar.screen.lt).filter(([_, value]) => value)[0][0]
    ) || 'lg'
);

const breakpoints = computed(() => config.table.props.breakpoints[size.value]);

const columns = [
  {
    name: 'id',
    label: 'ID пользователя',
    field: 'id',
  },
  {
    name: 'username',
    label: 'Ник/Имя пользователя',
    field: 'username',
  },
  {
    name: 'type',
    label: 'Тип аккаунта',
    field: 'type',
  },
  {
    name: 'status',
    label: 'Статус',
    field: 'status',
  },
  {
    name: 'date',
    label: 'Дата первой/последней активности',
    field: 'date',
  },
  {
    name: 'balance',
    label: 'Баланс',
    field: 'balance',
  },
  {
    name: 'referer',
    label: 'Реферер',
    field: 'referer',
  },
  {
    name: 'actions',
    label: 'Действия',
    field: 'actions',
  },
];

const rows = [
  {
    id: '276239(#1321637641)',
    username: '@ggnebudet224',
    type: 'private',
    status: '1',
    date: '2020-10-29 03:00 2020-10-29 03:00',
    balance: '0',
    referer: '-',
    actions: '',
  },
  {
    id: '276239(#13216371)',
    username: '@ggnebudet224',
    type: 'private',
    status: '1',
    date: '2020-10-29 03:00 2020-10-29 03:00',
    balance: '0',
    referer: '-',
    actions: '',
  },
  {
    id: '276239(#11637641)',
    username: '@ggnebudet224',
    type: 'private',
    status: '1',
    date: '2020-10-29 03:00 2020-10-29 03:00',
    balance: '0',
    referer: '-',
    actions: '',
  },
];
</script>

<style scoped lang="scss"></style>
