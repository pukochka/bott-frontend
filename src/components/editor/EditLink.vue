<template>
  <q-btn flat size="md" color="primary" icon="edit" :href="link">
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Пeрейти в <span class="text-weight-bold">{{ text }}</span>
    </q-tooltip>
  </q-btn>
</template>

<script lang="ts" setup>
withDefaults(defineProps<EditLinkProps>(), {
  link: undefined,
  text: '',
});

interface EditLinkProps {
  link: string | undefined;
  text: string;
}
</script>

<style lang="scss" scoped></style>
