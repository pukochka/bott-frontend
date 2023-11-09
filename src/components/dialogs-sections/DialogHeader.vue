<template>
  <q-toolbar class="q-px-md">
    <q-toolbar-title>{{ label }}</q-toolbar-title>

    <q-btn
      flat
      round
      dense
      size="md"
      color="primary"
      icon="close"
      v-close-popup
    />
  </q-toolbar>
</template>

<script lang="ts" setup>
withDefaults(defineProps<DialogHeaderProps>(), {
  label: '',
});

interface DialogHeaderProps {
  label: string;
}
</script>

<style lang="scss" scoped></style>
