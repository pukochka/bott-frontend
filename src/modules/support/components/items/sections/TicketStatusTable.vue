<template>
  <div class="row justify-center items-center">
    <q-btn
      unelevated
      no-wrap
      no-caps
      class="rounded"
      padding="2px 12px"
      :color="view.color"
      :label="view.label"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ticketStatuses } from '../../../utils/statuses';

const props = withDefaults(defineProps<TicketStatusProps>(), {
  status: 1,
});

const view = computed(() => ticketStatuses[props.status] ?? ticketStatuses[0]);

interface TicketStatusProps {
  status: number;
}
</script>

<style scoped lang="scss"></style>
