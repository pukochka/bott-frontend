<template>
  <div class="">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <ticket-chat></ticket-chat>
      </div>

      <div class="col-12 col-md-6">
        <ticket-actions></ticket-actions>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TicketChat from './components/TicketChat.vue';
import TicketActions from './components/TicketActions.vue';
</script>

<style lang="scss" scoped></style>
