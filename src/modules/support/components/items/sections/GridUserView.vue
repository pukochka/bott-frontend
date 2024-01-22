<template>
  <q-item>
    <q-item-section>{{ label }}</q-item-section>

    <q-item-section side>
      <div v-html="value" class="text-primary"></div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<UserViewProps>(), {
  label: '',
  value: '',
});

interface UserViewProps {
  label: any;
  value: any;
}
</script>

<style scoped lang="scss"></style>
