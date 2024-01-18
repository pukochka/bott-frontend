<template>
  <div class="absolute-full relative-position bg-page">
    <div class="absolute-full" :style="{ background: colors[color] }"></div>

    <messages-section></messages-section>

    <top-section></top-section>

    <bottom-section></bottom-section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import MessagesSection from './sections/MessagesSection.vue';
import TopSection from './sections/TopSection.vue';
import BottomSection from './sections/BottomSection.vue';

const colors = [
  'linear-gradient(90deg, hsla(186, 33%, 94%, 0.6) 0%, hsla(216, 41%, 79%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(298, 68%, 90%, 0.6) 0%, hsla(30, 82%, 91%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(332, 53%, 82%, 0.6) 0%, hsla(176, 57%, 89%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(145, 83%, 74%, 0.6) 0%, hsla(204, 77%, 76%, 0.6) 100%)',
];

const color = ref(Math.floor(Math.random() * colors.length));

onBeforeMount(() => (color.value = Math.floor(Math.random() * colors.length)));
</script>

<style lang="scss" scoped>
.bg-page {
  background: #fafafa;
}
.card-border__bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
body.body--dark {
  .card-border__bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  }
}
</style>
