<template>
  <q-card flat square class="absolute-top card-border__bottom">
    <div class="row justify-between relative-position">
      <div class="row">
        <q-btn
          flat
          square
          v-for="(button, index) of buttons"
          :key="index"
          :color="button.color"
          :icon="button.icon"
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
      action: '',
      condition: '',
    },
    offer: {
      action: '',
      condition: '',
    },
    move: {
      action: '',
      condition: '',
    },
    delete: {
      action: '',
      condition: '',
    },
    edit: {
      action: '',
      condition: '',
    },
  })
);
</script>

<style scoped lang="scss"></style>
