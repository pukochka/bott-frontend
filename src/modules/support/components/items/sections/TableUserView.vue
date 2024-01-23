<template>
  <div v-html="name" class="text-primary"></div>
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
    ? props.ticket?.manager !== null
      ? props.ticket?.manager?.first_name +
        ' ' +
        props.ticket?.manager?.last_name
      : `<span class='text-red'>Нет</span>`
    : props.ticket?.user?.first_name + ' ' + props.ticket?.user?.last_name
);

interface UserViewProps {
  ticket: SupportTicket;
  implementer: boolean;
}
</script>

<style scoped lang="scss"></style>
