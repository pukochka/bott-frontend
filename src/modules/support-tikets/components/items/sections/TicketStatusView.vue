<template>
  <q-item>
    <q-item-section>{{ item.label }}</q-item-section>

    <q-item-section side>
      <ticket-status :status="item.value"></ticket-status>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import TicketStatus from './TicketStatus.vue';

withDefaults(defineProps<TicketInfoProps>(), {
  item: () => ({ label: '', value: 0 }),
});

interface TicketInfoProps {
  item: { label: string; value: number };
}
</script>

<style scoped lang="scss"></style>
