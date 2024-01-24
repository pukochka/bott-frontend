<template>
  <q-drawer
    bordered
    side="right"
    :width="width"
    :mini-width="70"
    :mini="support.drawer.mini"
    v-model="support.drawer.state"
  >
    <div class="absolute-full">
      <q-list class="full-height">
        <q-item
          clickable
          class="transition"
          :class="[support.drawer.mini ? ' absolute-full' : '']"
          @click="toggleDrawer"
        >
          <q-item-section avatar>
            <q-icon
              :name="support.drawer.mini ? 'info' : 'chevron_right'"
              color="primary"
              size="26px"
            />
          </q-item-section>

          <q-item-section class="absolute-center">
            Сведения о тикете
          </q-item-section>
        </q-item>

        <div class="" v-if="!support.drawer.mini">
          <component
            v-for="(item, index) of info"
            :key="index"
            :is="item.component"
            :label="item.label"
            :value="item.value"
          ></component>
        </div>
      </q-list>
    </div>

    <q-inner-loading :showing="support.loading.category">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';

import { useSupportStore } from '../../../stores/supportStore';

import TicketStatusGrid from '../../items/sections/TicketStatusGrid.vue';
import TicketInfo from '../../items/sections/TicketInfo.vue';
import GridUserView from '../../items/sections/GridUserView.vue';
import { date, useQuasar } from 'quasar';

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);
const md = computed(() => quasar.screen.lt.md);
const width = computed(() => (sm.value ? 300 : 350));

const toggleDrawer = () => {
  support.drawer.mini = md.value ? false : !support.drawer.mini;
  support.drawer.state = md.value ? !support.drawer.state : true;
};

onBeforeMount(() => {
  if (md.value) support.drawer.state = false;
});

const info = computed(() => [
  {
    label: 'Статус',
    value: support.selectedTicket,
    component: TicketStatusGrid,
  },
  {
    label: 'Запрос от',
    value: support.selectedTicket?.user?.link,
    component: GridUserView,
  },
  {
    label: 'Исполнитель',
    value:
      support.selectedTicket?.manager?.link ??
      '<span class="text-red">Нет</span>',
    component: GridUserView,
  },
  {
    label: 'Время создания',
    value: date.formatDate(
      Date.parse(support.selectedTicket?.created_at ?? ''),
      'DD MMM, YYYY HH:mm'
    ),
    component: TicketInfo,
  },
  {
    label: 'Время принятия в работу',
    value: date.formatDate(
      Date.parse(support.selectedTicket?.accepted_at ?? ''),
      'DD MMM, YYYY HH:mm'
    ),
    component: TicketInfo,
  },
  {
    label: 'Время закрытия',
    value: date.formatDate(
      Date.parse(support.selectedTicket?.closed_at ?? ''),
      'DD MMM, YYYY HH:mm'
    ),
    component: TicketInfo,
  },
  {
    label: 'Время автоматического удаления',
    value: date.formatDate(
      Date.parse(support.selectedTicket?.deleted_at ?? ''),
      'DD MMM, YYYY HH:mm'
    ),
    component: TicketInfo,
  },
]);
</script>

<style scoped lang="scss"></style>
