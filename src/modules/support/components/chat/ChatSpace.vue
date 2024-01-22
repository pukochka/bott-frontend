<template>
  <div class="absolute-full relative-position bott-page__background">
    <div class="absolute-full" :style="{ background: colors[color] }"></div>

    <div class="absolute-full"></div>

    <messages-section v-if="!loading"></messages-section>

    <top-section></top-section>

    <bottom-section></bottom-section>

    <q-inner-loading
      :showing="loading"
      class="bott-page__background"
      transition-show="none"
    >
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { fetchSupportMessages } from '../../api/queries';
import { useSupportStore } from '../../stores/supportStore';

import MessagesSection from './sections/MessagesSection.vue';
import TopSection from './sections/TopSection.vue';
import BottomSection from './sections/BottomSection.vue';

const support = useSupportStore();

const loading = ref(true);

const colors = [
  'linear-gradient(90deg, hsla(186, 33%, 94%, 0.6) 0%, hsla(216, 41%, 79%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(298, 68%, 90%, 0.6) 0%, hsla(30, 82%, 91%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(332, 53%, 82%, 0.6) 0%, hsla(176, 57%, 89%, 0.6) 100%)',
  'linear-gradient(90deg, hsla(145, 83%, 74%, 0.6) 0%, hsla(204, 77%, 76%, 0.6) 100%)',
];

const color = ref(Math.floor(Math.random() * colors.length));

onBeforeMount(() => {
  loading.value = true;

  support.updateMessages().then(() => (loading.value = false));
});

onBeforeMount(() => (color.value = Math.floor(Math.random() * colors.length)));
</script>

<style lang="scss" scoped>
.bg-page {
  background: #fafafa;
}
</style>
