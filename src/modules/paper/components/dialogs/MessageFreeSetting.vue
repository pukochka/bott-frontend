<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="store.dialogs.message_free"
  >
    <div class="row justify-center">
      <q-card>
        <inline-menu :message="store.selectedMessageFree"></inline-menu>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePSStore } from '../../stores/PSstore';
import InlineMenu from '../../../inline-menu/InlineMenu.vue';

const store = usePSStore();
</script>

<style scoped lang="scss"></style>
