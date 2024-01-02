<template>
  <q-item>
    <q-item-section>{{ item.label }}</q-item-section>

    <q-item-section side>{{ item.value }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
withDefaults(defineProps<TicketInfoProps>(), {
  item: () => ({ label: '', value: '' }),
});

interface TicketInfoProps {
  item: { label: string; value: string };
}
</script>

<style scoped lang="scss"></style>
