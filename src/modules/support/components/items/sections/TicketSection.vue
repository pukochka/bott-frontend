<template>
  <q-item v-if="grid">
    <q-item-section>{{ col.label }}</q-item-section>

    <q-item-section side>
      <component
        :is="props.component"
        :col="props.col"
        :ticket="props.ticket"
      ></component>
    </q-item-section>
  </q-item>

  <component
    v-else
    :is="props.component"
    :col="props.col"
    :ticket="props.ticket"
  ></component>
</template>

<script setup lang="ts">
import { defaultTicket } from '../../../stores/supportModels';

const props = withDefaults(defineProps<TicketSectionProps>(), {
  ticket: () => defaultTicket,
  component: () => ({}),
  col: () => ({ name: '', field: () => '', label: '' }),
  grid: false,
});

interface TicketSectionProps {
  ticket: SupportTicket;
  component: any;
  col: { name?: string; field?: any; label: string };
  grid?: boolean;
}
</script>

<style scoped lang="scss"></style>
