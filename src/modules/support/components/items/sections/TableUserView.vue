<template>
  <div v-html="value" class="text-primary"></div>
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
