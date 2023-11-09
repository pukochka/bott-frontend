<template>
  <div
    class="relative-position"
    style="height: calc(100vh - 64px); width: 100%"
    :class="classes"
  >
    <canvas
      id="feedback-layer"
      :style="{ width: quasar.screen.width - 60 + 'px' }"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { install } from './utils/create';
import { usePSStore } from './stores/PSstore';
import { useQuasar } from 'quasar';

const store = usePSStore();
const quasar = useQuasar();

// const c = computed(() => {
//   return {
//     ' cursor-grabbing': store.dragging,
//     ' cursor-grab': store.onmessage || store.onconnection,
//     ' cursor-pointer': store.clickable,
//   };
// });

const classes = computed(
  () =>
    (store.dragging ? ' cursor-grabbing' : '') +
    (store.onmessage || store.onconnection ? ' cursor-grab' : '') +
    (store.clickable ? ' cursor-pointer' : '')
);

onMounted(install);
</script>

<style scoped lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
.cursor-grabbing {
  cursor: grabbing !important;
}
.cursor-grab {
  cursor: grab;
}
</style>
