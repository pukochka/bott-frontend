<template>
  <q-btn
    square
    flat
    size="md"
    color="primary"
    class="fit"
    :icon="icon"
    :loading="loading"
    @click="action"
  >
    <q-tooltip
      v-if="label && label !== ''"
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      {{ label }}
    </q-tooltip>

    <slot></slot>
  </q-btn>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<BottomPaginationButtonProps>(), {
  icon: undefined,
  action: () => false,
  loading: false,
  label: '',
});

interface BottomPaginationButtonProps {
  icon?: string;
  action?: (() => void) | string;
  loading?: boolean;
  label?: string;
}
</script>

<style scoped lang="scss"></style>
