<template>
  <q-list style="min-width: 100px" dense>
    <q-item
      clickable
      v-close-popup
      v-for="(button, index) of buttons"
      :key="index"
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

import { ticketMenu, TicketMenuNames } from '../../../utils/ticket-menu';
import { useSupportStore } from '../../../stores/supportStore';

const support = useSupportStore();

const buttons = computed(() =>
  Object.entries(ticketMenu).map(([key, value]) =>
    Object.assign(actions.value[<TicketMenuNames>key], value)
  )
);

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
      action: '',
      condition: '',
    },
    edit: {
      action: () => (support.dialogs.edit_ticket = true),
      condition: '',
    },
  })
);
</script>

<style scoped lang="scss"></style>
