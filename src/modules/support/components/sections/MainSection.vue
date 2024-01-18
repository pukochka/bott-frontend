<template>
  <div :class="[support.section !== 'list' ? ' q-pa-md' : ' q-px-md']">
    <component :is="section"></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSupportStore } from '../../stores/supportStore';
import { views } from '../views';

const support = useSupportStore();

const section = computed(() => views[support.section]);
</script>

<style scoped lang="scss"></style>
