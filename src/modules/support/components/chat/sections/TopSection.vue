<template>
  <q-card
    flat
    square
    class="absolute-top card-border__bottom bott-page__background"
  >
    <div class="row justify-between relative-position">
      <div class="row">
        <q-btn
          flat
          square
          v-for="(button, index) of buttons"
          :key="index"
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

      <q-btn
        padding="8px 22px"
        square
        flat
        size="md"
        color="primary"
        icon="close"
        @click="support.chat = false"
      />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../../stores/supportStore';
import { computed } from 'vue';

import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';
import { useDialog } from '../../../../file-manager/stores/useDialog';

const support = useSupportStore();

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

const deleteTicket = () => {
  useDialog(
    'Вы уверены, что хотите удалить тикет ' +
      support.selectedTicket?.title +
      '?',
    true
  ).onOk(() => {
    console.log(1);
  });
};

const actions = computed(
  (): Record<TicketMenuNames, any> => ({
    pick: {
      action: '',
      condition: '',
    },
    transfer: {
      action: () => (support.dialogs.executor_transfer = true),
      condition: '',
    },
    offer: {
      action: '',
      condition: '',
    },
    move: {
      action: () => (support.dialogs.transfer_ticket = true),
      condition: '',
    },
    delete: {
      action: deleteTicket,
      condition: '',
    },
    edit: {
      action: () => (support.dialogs.edit_ticket = true),
      condition: '',
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
