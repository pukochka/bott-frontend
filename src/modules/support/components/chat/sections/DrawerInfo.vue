<template>
  <q-drawer
    bordered
    no-swipe-open
    side="right"
    :width="width"
    v-model="support.drawer"
  >
    <div class="absolute-full">
      <q-list class="full-height">
        <q-item clickable class="transition" @click="toggleDrawer">
          <q-item-section avatar>
            <q-icon name="chevron_right" color="primary" size="26px" />
          </q-item-section>

          <q-item-section class="absolute-center">
            Сведения о тикете
          </q-item-section>
        </q-item>

        <ticket-section
          grid
          v-for="(column, index) of drawerColumns"
          :key="index"
          :component="column.component"
          :col="column.col"
          :ticket="support.selectedTicket ?? defaultTicket"
        ></ticket-section>

        <q-item clickable class="transition" @click="support.closeChat">
          <q-item-section avatar>
            <q-icon name="close" color="red" size="26px" />
          </q-item-section>

          <q-item-section class="absolute-center"> Закрыть чат </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-inner-loading :showing="support.loading.category">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-drawer>
</template>

<script setup lang="ts">
import { date, useQuasar } from 'quasar';
import { computed } from 'vue';

import { useSupportStore } from '../../../stores/supportStore';

import { defaultTicket } from '../../../stores/supportModels';

import TicketInfo from '../../items/sections/TicketInfo.vue';
import StatusView from '../../items/sections/StatusView.vue';
import UserView from '../../items/sections/UserView.vue';
import TicketSection from '../../items/sections/TicketSection.vue';

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);
const width = computed(() => (sm.value ? 300 : 350));

const toggleDrawer = () => {
  support.drawer = !support.drawer;
};

const format = (value?: string | null) => {
  return value
    ? date.formatDate(Date.parse(value), 'DD MMM, YYYY HH:mm')
    : '<span class="bott-token text-grey font-13">Нет</span>';
};

const drawerColumns = computed(() => [
  {
    col: { label: 'Статус' },
    component: StatusView,
  },
  {
    col: { label: 'Запрос от', name: 'user' },
    component: UserView,
  },
  {
    col: { label: 'Исполнитель', name: 'implementer' },
    component: UserView,
  },
  {
    col: {
      label: 'Время создания',
      field: () => format(support.selectedTicket?.created_at),
    },
    component: TicketInfo,
  },
  {
    col: {
      label: 'Время принятия в работу',
      field: () => format(support.selectedTicket?.accepted_at),
    },
    component: TicketInfo,
  },
  {
    col: {
      label: 'Время закрытия',
      field: () => format(support.selectedTicket?.closed_at),
    },
    component: TicketInfo,
  },
  {
    col: {
      label: 'Время автоматического удаления',
      field: () => format(support.selectedTicket?.deleted_at),
    },
    component: TicketInfo,
  },
]);
</script>

<style scoped lang="scss"></style>
