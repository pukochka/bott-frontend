<template>
  <q-card
    flat
    square
    class="absolute-top card-border__bottom bott-page__background"
  >
    <div class="row justify-between relative-position">
      <q-btn flat square color="primary" icon="more_vert" v-if="md">
        <q-menu class="bott-portal-menu">
          <q-list dense>
            <q-item
              clickable
              v-close-popup
              v-for="(button, index) of buttons"
              :key="index"
              v-show="button.condition"
              @click="button.action"
            >
              <q-item-section avatar>
                <q-icon :name="button.icon" :color="button.color" size="26px" />
              </q-item-section>

              <q-item-section>{{ button.label }}</q-item-section>

              <q-inner-loading :showing="button.loading">
                <q-spinner-gears size="32px" color="primary" />
              </q-inner-loading>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div class="row" v-else>
        <q-btn
          flat
          square
          v-for="(button, index) of buttons"
          :key="index"
          v-show="button.condition"
          :loading="button.loading"
          :color="button.color"
          :icon="button.icon"
          @click="button.action"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="bottom middle"
            self="top middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="text-h6 text-weight-bold absolute-center">Чат</div>

      <div class="row">
        <q-btn
          padding="8px 22px"
          square
          flat
          size="md"
          color="primary"
          icon="info"
          v-if="md"
          @click="toggleDrawer"
        />

        <q-btn
          padding="8px 22px"
          square
          flat
          size="md"
          color="primary"
          icon="close"
          @click="support.closeChat"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../../stores/supportStore';
import { computed, ref } from 'vue';

import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';
import { useDialog } from '../../../../file-manager/stores/useDialog';
import { useQuasar } from 'quasar';
import { fetchSupportTicket } from '../../../api/queries';
import { ticketStatuses } from '../../../utils/statuses';

const support = useSupportStore();
const quasar = useQuasar();

const md = computed(() => quasar.screen.lt.md);

const loading = ref({
  1: false,
  2: false,
  delete: false,
  close: false,
});

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

const toggleDrawer = () => {
  support.drawer.mini = false;
  support.drawer.state = !support.drawer.state;
};

const work = (status: 1 | 2) => {
  if (ticketStatuses[status].text.length === 0) {
    changeStatus(status);

    return;
  }

  useDialog(ticketStatuses[status].text, true).onOk(() => changeStatus(status));
};

const changeStatus = (status: 1 | 2) => {
  loading.value[status] = true;
  fetchSupportTicket('change-status', {
    ticket_id: support.selectedTicket?.id ?? -1,
    manager_id: support.selectedTicket?.manager?.id ?? -1,
    status: status,
  }).then(() => (loading.value[status] = false));
};

const offerTicket = () => {
  useDialog('Вы уверены, что хотите предложить закрыть тикет?', true).onOk(
    () => {
      loading.value.offer = true;
      fetchSupportTicket('change-status', {
        ticket_id: support.selectedTicket?.id ?? -1,
        manager_id: support.selectedTicket?.manager?.id ?? -1,
        status: 1,
      }).then(() => (loading.value.offer = false));
    }
  );
};

const deleteTicket = () => {
  useDialog('Вы уверены, что хотите удалить тикет?', true).onOk(() => {
    loading.value.delete = true;
    fetchSupportTicket('delete', {
      ticket_id: support.selectedTicket?.id ?? -1,
    }).then(() => (loading.value.offer = false));
  });
};

const actions = computed(
  (): Record<TicketMenuNames, any> => ({
    pick: {
      action: '',
      condition: ![2].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.pick,
    },
    close: {
      action: '',
      condition: [3].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.close,
    },
    transfer: {
      action: () => (support.dialogs.executor_transfer = true),
      condition: [2, 3, 4].includes(support.selectedTicket?.status ?? -1),
      loading: false,
    },
    offer: {
      action: offerTicket,
      condition: [2].includes(support.selectedTicket?.status ?? -1),
      loading: loading.value.offer,
    },
    move: {
      action: () => (support.dialogs.transfer_ticket = true),
      condition: true,
      loading: false,
    },
    delete: {
      action: deleteTicket,
      condition: true,
      loading: loading.value.delete,
    },
    edit: {
      action: () => (support.dialogs.edit_ticket = true),
      condition: true,
      loading: false,
    },
  })
);
</script>

<style scoped lang="scss">
.card-border__bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
body.body--dark {
  .card-border__bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  }
}
</style>
