<template>
  <q-item>
    <q-item-section>{{ label }}</q-item-section>

    <q-item-section side>
      <q-btn
        unelevated
        no-wrap
        no-caps
        class="rounded"
        padding="2px 12px"
        :color="status.color"
      >
        <div class="ellipsis">{{ status.label }}</div>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ticketStatuses } from '../../../utils/statuses';

const props = withDefaults(defineProps<TicketStatusProps>(), {
  label: '',
  value: '',
});

const status = computed(() => ticketStatuses[props.value] ?? ticketStatuses[0]);

interface TicketStatusProps {
  label: any;
  value: any;
}
</script>

<style scoped lang="scss"></style>
