<template>
  <q-btn no-caps dense flat size="md" color="primary" class="rounded">
    <div v-html="value"></div>

    <q-tooltip class="bott-tooltip" anchor="top middle" self="bottom middle">
      Перейти в телеграм
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<UserViewProps>(), {
  value: '',
});

interface UserViewProps {
  value: any;
}
</script>

<style scoped lang="scss"></style>
