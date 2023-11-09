<template>
  <div
    class="col-12 col-sm-6 col-md-3"
    v-for="(button, index) in actions"
    :key="index"
  >
    <q-btn
      class="fit rounded"
      padding="8px"
      flat
      stack
      size="md"
      color="primary"
      :icon="button.icon"
      :label="button.label"
      :href="button.href"
    />
  </div>
</template>

<script setup lang="ts">
import actions from '../../stores/actions';
</script>

<style lang="scss" scoped></style>
