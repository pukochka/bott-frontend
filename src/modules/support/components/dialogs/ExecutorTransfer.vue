<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.executor_transfer"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор другого исполнителя"></dialog-header>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const support = useSupportStore();
</script>

<style scoped lang="scss"></style>
