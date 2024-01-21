<template>
  <q-list style="min-width: 100px" dense>
    <q-item
      clickable
      v-close-popup
      v-for="(button, index) of buttons"
      :key="index"
      v-show="button.condition"
      @click="button.action"
    >
      <q-item-section avatar>
        <q-icon :name="button.icon" :color="button.color" size="22px" />
      </q-item-section>

      <q-item-section>{{ button.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { defaultTicket } from '../../../stores/supportModels';
import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';

import { useSupportStore } from '../../../stores/supportStore';
import { useDialog } from '../../../../file-manager/stores/useDialog';
import { fetchSupportTicket } from '../../../api/queries';
import { config } from '../../../config';

const props = withDefaults(defineProps<TicketMenuProps>(), {
  ticket: () => defaultTicket,
});

const emit = defineEmits<{
  (e: 'loading', value: boolean): void;
}>();

const support = useSupportStore();

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

const offerTicket = () => {
  useDialog('Вы уверены, что хотите предложить закрыть тикет?', true).onOk(
    () => {
      emit('loading', true);
      fetchSupportTicket('change-status', {
        ticket_id: props.ticket.id,
        manager_id: props.ticket.manager?.id ?? -1,
        status: 3,
      }).then(() => emit('loading', false));
    }
  );
};

const deleteTicket = () => {
  useDialog('Вы уверены, что хотите удалить тикет?', true).onOk(() => {
    emit('loading', true);
    fetchSupportTicket('delete', { ticket_id: props.ticket.id }).then(() =>
      emit('loading', false)
    );
  });
};

const pickTicket = () => {
  emit('loading', true);
  fetchSupportTicket('change-status', {
    ticket_id: props.ticket.id,
    manager_id: config.user_id,
    status: 2,
  }).then(() => emit('loading', false));
};

const closeTicket = () => {
  useDialog('Вы уверены, что хотите закрыть тикет?', true).onOk(() => {
    emit('loading', true);
    fetchSupportTicket('change-status', {
      ticket_id: props.ticket.id,
      manager_id: props.ticket.manager?.id ?? -1,
      status: 1,
    }).then(() => emit('loading', false));
  });
};

const actions = computed(
  (): Record<TicketMenuNames, any> => ({
    pick: {
      action: pickTicket,
      condition: ![2].includes(props.ticket.status),
      text: '',
    },
    close: {
      action: closeTicket,
      condition: [3].includes(props.ticket.status),
    },
    transfer: {
      action: () => (support.dialogs.executor_transfer = true),
      condition: [2, 3, 4].includes(props.ticket.status),
      text: '',
    },
    offer: {
      action: offerTicket,
      condition: [2].includes(props.ticket.status),
      text: '',
    },
    move: {
      action: () => (support.dialogs.transfer_ticket = true),
      condition: true,
      text: '',
    },
    delete: {
      action: deleteTicket,
      condition: true,
      text: '',
    },
    edit: {
      action: () => (support.dialogs.edit_ticket = true),
      condition: true,
      text: '',
    },
  })
);

interface TicketMenuProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
