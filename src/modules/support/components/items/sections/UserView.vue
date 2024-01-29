<template>
  <div class="row justify-center">
    <div
      v-html="name"
      style="max-width: 150px"
      class="text-primary ellipsis bott-token font-13"
      v-if="props.ticket.manager || !(props.col.name === 'implementer')"
    ></div>

    <div v-else class="bott-token font-13 text-red">Нет</div>
  </div>
</template>

<script setup lang="ts">
import { defaultTicket } from '../../../stores/supportModels';
import { computed } from 'vue';

const props = withDefaults(defineProps<UserViewProps>(), {
  ticket: () => defaultTicket,
  col: () => ({ name: '', field: () => '' }),
});

const name = computed(() =>
  props.col.name === 'implementer'
    ? props.ticket?.manager?.first_name + ' ' + props.ticket?.manager?.last_name
    : props.ticket?.user?.first_name + ' ' + props.ticket?.user?.last_name
);

interface UserViewProps {
  ticket: SupportTicket;
  col: { name: string; field: any };
}
</script>

<style scoped lang="scss"></style>
