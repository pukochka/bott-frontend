<template>
  <div class="font-13" v-html="props.col.field(props.ticket)"></div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { defaultTicket } from '../../../stores/supportModels';

const props = withDefaults(defineProps<TicketInfoProps>(), {
  ticket: () => defaultTicket,
  col: () => ({ name: '', field: (row: SupportTicket) => row.id }),
});

const quasar = useQuasar();

const percents = computed(() => (quasar.screen.lt.sm ? 60 : 70));

interface TicketInfoProps {
  ticket: SupportTicket;
  col: { name: string; field: any };
}
</script>

<style scoped lang="scss"></style>
