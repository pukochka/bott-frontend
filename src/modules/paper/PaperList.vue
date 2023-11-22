<template>
  <div
    class="relative-position overflow-hidden"
    style="height: calc(100vh - 64px); width: 100%"
    :class="classes"
  >
    <canvas
      id="feedback-layer"
      :style="{ width: quasar.screen.width - 60 + 'px' }"
    ></canvas>

    <q-inner-loading
      :showing="store.position.visible"
      @click="closeMenu"
      class="bg-alpha cursor-default"
    >
      <div class=""></div>
    </q-inner-loading>

    <create-input></create-input>

    <!--    <goodbye-menu></goodbye-menu>-->

    <main-menu></main-menu>

    <start-menu></start-menu>

    <end-menu></end-menu>
  </div>

  <notify-setting></notify-setting>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { install } from './utils/create';
import { usePSStore } from './stores/PSstore';
import { useQuasar } from 'quasar';
import EndMenu from './components/EndMenu.vue';
import NotifySetting from './components/dialogs/NotifySetting.vue';
import CreateInput from './components/CreateInput.vue';
import StartMenu from './components/StartMenu.vue';
import MainMenu from './components/MainMenu.vue';
import GoodbyeMenu from './components/GoodbyeMenu.vue';

const store = usePSStore();
const quasar = useQuasar();

// const c = computed(() => {
//   return {
//     ' cursor-grabbing': store.dragging,
//     ' cursor-grab': store.onmessage || store.onconnection,
//     ' cursor-pointer': store.clickable,
//   };
// });

const closeMenu = () => {
  store.position.visible = false;
  if (store.position.action) store.position.action();
};

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
.cursor-default {
  cursor: default !important;
}
.bg-alpha {
  background: rgba(0, 0, 0, 0.28);
}
</style>
