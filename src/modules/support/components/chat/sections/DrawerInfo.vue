<template>
  <q-drawer
    bordered
    side="right"
    :width="width"
    :mini-width="70"
    :mini="support.drawer.mini"
    v-model="support.drawer.state"
  >
    <div style="margin: 40px 0 57px 0" class="absolute-full">
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
import { computed } from 'vue';

import { useSupportStore } from '../../../stores/supportStore';

import TicketStatusGrid from '../../items/sections/TicketStatusGrid.vue';
import TicketInfo from '../../items/sections/TicketInfo.vue';
import GridUserView from '../../items/sections/GridUserView.vue';
import { useQuasar } from 'quasar';

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);
const md = computed(() => quasar.screen.lt.md);
const width = computed(() => (sm.value ? 300 : 350));

const toggleDrawer = () => {
  support.drawer.mini = md.value ? false : !support.drawer.mini;
  support.drawer.state = md.value ? !support.drawer.state : true;
};

const info = computed(() => [
  {
    label: 'Статус',
    value: support.selectedTicket?.status ?? 0,
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
    value: support.selectedTicket?.created_at ?? '',
    component: TicketInfo,
  },
  {
    label: 'Время принятия в работу',
    value: support.selectedTicket?.accepted_at ?? '',
    component: TicketInfo,
  },
  {
    label: 'Время закрытия',
    value: support.selectedTicket?.closed_at ?? '',
    component: TicketInfo,
  },
  {
    label: 'Время автоматического удаления',
    value: support.selectedTicket?.deleted_at ?? '',
    component: TicketInfo,
  },
]);
</script>

<style scoped lang="scss"></style>
