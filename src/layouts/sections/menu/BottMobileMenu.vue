<template>
  <div class="row justify-center fixed-top transition" :class="menuClasses">
    <div
      class="row items-center bott-header q-pa-sm rounded bordered"
      style="height: 56px"
    >
      <bott-header-menu></bott-header-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStatesStore } from 'stores/states/statesStore';
import { computed } from 'vue';
import BottHeaderMenu from 'layouts/sections/menu/BottHeaderMenu.vue';

const states = useStatesStore();

const menuClasses = computed(() => (states.menu ? 'bott-menu__opened' : ''));
</script>

<style lang="scss" scoped>

.bott-menu__opened {
  transform: translateY(120%);
}
</style>
