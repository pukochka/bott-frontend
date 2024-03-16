<template>
  <chat-section v-if="support.selectedTicket"></chat-section>

  <div
    class="absolute-center"
    v-if="support.selectedTicket === null && !support.selectedCategory"
  >
    <q-chip
      label="Выберите категорию"
      text-color="white"
      color="grey"
      size="lg"
    >
    </q-chip>
  </div>

  <div
    class="absolute-center"
    v-if="support.selectedTicket === null && support.selectedCategory"
  >
    <q-chip label="Выберите тикет" color="grey" text-color="white" size="lg">
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';

import ChatSection from '../chat/ChatSpace.vue';

const support = useSupportStore();
</script>

<style scoped lang="scss"></style>
