<template>
  <div class="row items-center justify-center q-gutter-x-sm q-pa-sm">
    <q-icon :name="icon" color="primary" size="26px" />

    <div class="text-body1 text-primary">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<PanelHeaderProps>(), {
  label: '',
  icon: 'tune',
});

interface PanelHeaderProps {
  label: string;
  icon: string;
}
</script>

<style scoped lang="scss"></style>
