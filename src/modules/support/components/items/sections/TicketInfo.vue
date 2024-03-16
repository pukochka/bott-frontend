<template>
  <div class="font-13" v-html="props.col.field(props.ticket)"></div>
</template>

<script setup lang="ts">
import { defaultTicket } from '../../../stores/supportModels';

const props = withDefaults(defineProps<TicketInfoProps>(), {
  ticket: () => defaultTicket,
  col: () => ({ name: '', field: (row: SupportTicket) => row.id }),
});

interface TicketInfoProps {
  ticket: SupportTicket;
  col: { name: string; field: any };
}
</script>

<style scoped lang="scss"></style>
