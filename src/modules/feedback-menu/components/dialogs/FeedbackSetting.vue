<template>
  <q-dialog v-model="store.dialogs.settings" position="bottom" full-width>
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat size="md" label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { useFeedbackStore } from '../../stores/feedbackStore';

const store = useFeedbackStore();
</script>

<style scoped lang="scss"></style>
