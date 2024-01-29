<template>
  <div class="row justify-center items-center">
    <q-btn
      unelevated
      no-wrap
      no-caps
      class="rounded"
      padding="2px 12px"
      :color="ticketStatus.color"
      :label="ticketStatus.label"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ticketStatuses } from '../../../utils/statuses';
import { defaultTicket } from '../../../stores/supportModels';

const props = withDefaults(defineProps<TicketStatusProps>(), {
  ticket: () => defaultTicket,
});

const ticketStatus = computed(
  () => ticketStatuses[props.ticket.status] ?? ticketStatuses[0]
);

interface TicketStatusProps {
  ticket: SupportTicket;
}
</script>

<style scoped lang="scss"></style>
