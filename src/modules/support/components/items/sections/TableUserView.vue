<template>
  <div
    v-html="name"
    class="text-primary bott-token font-13"
    v-if="props.ticket.manager || !props.implementer"
  ></div>

  <div v-else class="bott-token font-13 text-red">Нет</div>
</template>

<script setup lang="ts">
import { defaultTicket } from '../../../stores/supportModels';
import { computed } from 'vue';

const props = withDefaults(defineProps<UserViewProps>(), {
  ticket: () => defaultTicket,
  implementer: false,
});

const name = computed(() =>
  props.implementer
    ? props.ticket?.manager?.first_name + ' ' + props.ticket?.manager?.last_name
    : props.ticket?.user?.first_name + ' ' + props.ticket?.user?.last_name
);

interface UserViewProps {
  ticket: SupportTicket;
  implementer: boolean;
}
</script>

<style scoped lang="scss"></style>
