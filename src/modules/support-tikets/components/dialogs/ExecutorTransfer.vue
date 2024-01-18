<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="work.dialogs.executor_transfer"
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
import { useWorkStore } from '../../stores/workStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const work = useWorkStore();
</script>

<style scoped lang="scss"></style>
