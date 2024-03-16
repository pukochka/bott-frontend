<template>
  <span
    class="font-14 rounded q-px-xs text-center text-no-wrap"
    :class="[' bg-' + ticketStatus.color]"
  >
    {{ ticketStatus.label }}
  </span>
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
