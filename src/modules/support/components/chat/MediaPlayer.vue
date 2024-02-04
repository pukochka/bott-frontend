<template>
  <q-dialog
    maximized
    v-model="support.dialogs.media_player"
    transition-show="fade"
    transition-hide="fade"
    transition-duration="200"
    @before-hide="updateHide"
  >
    <div class="media-player" :style="transform">
      <div class="absolute-full flex flex-center" v-if="support.media.isVideo">
        <video controls>
          <source :src="support.media.link" />
        </video>
      </div>

      <q-img
        v-else
        class="overflow-hidden"
        spinner-color="primary"
        spinner-size="82px"
        fit="contain"
        width="calc(100vw - 20px)"
        height="calc(100vh - 20px)"
        v-touch-pan.prevent.mouse="handlePan"
        @wheel.prevent="handleWheel"
        :src="support.media.link"
        :class="[classes]"
        v-close-popup="scale === 1"
      />
    </div>

    <q-btn
      square
      unelevated
      size="md"
      color="primary"
      icon="close"
      class="absolute-top-right"
      v-close-popup
    />
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

const support = useSupportStore();

const scale = ref(1);
const isTranslate = ref(false);

const xDelta = ref(0);
const yDelta = ref(0);

const classes = computed(() =>
  isTranslate.value ? ' cursor-move' : scale.value !== 1 ? ' cursor-drag' : ''
);

const transform = computed(
  () =>
    `transform: translate3d(${xDelta.value}px, ${yDelta.value}px, 0px) scale(${scale.value})`
);

const handlePan = (ev: any) => {
  if (scale.value === 1) return;

  const { x, y } = ev.delta;

  isTranslate.value = true;
  xDelta.value += x;
  yDelta.value += y;

  if (ev.isFinal) {
    isTranslate.value = false;
  }
};

const handleWheel = (ev: WheelEvent) => {
  if (!ev.ctrlKey) return;

  const next = scale.value + 0.25;
  const prev = scale.value - 0.25;

  if (ev.deltaY < 0 && next < 4) {
    scale.value += 0.25;
  }

  if (ev.deltaY > 0 && prev > 0.75) {
    scale.value -= 0.25;
  }
};

const updateHide = () => {
  scale.value = 1;
  xDelta.value = 0;
  yDelta.value = 0;
  support.media.link = '';
  support.media.isVideo = false;
};
</script>

<style scoped lang="scss">
.media-player {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: none;
  overflow: hidden;
  z-index: 1;
  padding: 3.25rem 0;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.cursor-drag {
  cursor: grab;
}
</style>
