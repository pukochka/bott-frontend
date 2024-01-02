<template>
  <div :class="[work.section !== 'list' ? ' q-pa-md' : ' q-px-md']">
    <component :is="section"></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkStore } from '../../stores/workStore';
import { views } from '../views';

const work = useWorkStore();

const section = computed(() => views[work.section]);
</script>

<style scoped lang="scss"></style>
