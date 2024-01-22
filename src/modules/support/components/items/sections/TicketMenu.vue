<template>
  <q-list dense>
    <q-item
      clickable
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

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-list>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { defaultTicket } from '../../../stores/supportModels';
import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';

import { useSupportStore } from '../../../stores/supportStore';

const props = withDefaults(defineProps<TicketMenuProps>(), {
  ticket: () => defaultTicket,
});

const support = useSupportStore();

const loading = ref(false);

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

const offerTicket = () => {
  support.workStatus(
    3,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
};

const pickTicket = () => {
  support.workStatus(
    2,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
};

const closeTicket = () => {
  support.workStatus(
    1,
    props.ticket.id,
    () => (loading.value = true),
    () => (loading.value = false)
  );
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
      action: () => (support.dialogs.implementor_transfer = true),
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
      action: () =>
        support.deleteTicket(
          props.ticket.id,
          () => (loading.value = true),
          () => (loading.value = false)
        ),
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
