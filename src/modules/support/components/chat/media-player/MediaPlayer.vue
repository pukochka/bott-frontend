<template>
  <q-dialog
    maximized
    transition-show="fade"
    transition-hide="fade"
    transition-duration="200"
    @before-hide="updateHide"
    @before-show="updateShow"
    @wheel.prevent
    v-model="support.dialogs.media_player"
  >
    <div class="relative-position">
      <top-section
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
        class="bott-media--head"
      >
      </top-section>

      <div
        class="bott-media--content"
        style="z-index: 1"
        v-if="support.media.isVideo"
      >
        <video controls autoplay playsinline class="bott-player">
          <source :src="support.media.link" />
        </video>
      </div>

      <div class="bott-media--slides" v-else>
        <div class="bott-media--slide">
          <div
            class="bott-media--content"
            @touchend="endZoom"
            @touchmove="moveTwoTouch"
            @touchstart="startTwoTouch"
            @wheel.prevent="handleWheel"
            v-close-popup="scale === 1"
            v-touch-pan.prevent.mouse="handlePan"
          >
            <q-img
              spinner-size="82px"
              spinner-color="primary"
              :style="transform"
              :class="[classes]"
              :width="width + 'px'"
              :src="support.media.link"
            />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSupportStore } from '../../../stores/supportStore';
import TopSection from './sections/TopSection.vue';

const support = useSupportStore();

const scale = ref(1);
const width = ref(1);
const start = ref({
  distance: 0,
  x: 0,
  y: 0,
});
const isTranslate = ref(false);

const xDelta = ref(0);
const yDelta = ref(0);

const classes = computed(() =>
  isTranslate.value ? ' cursor-move' : scale.value !== 1 ? ' cursor-drag' : ''
);

const transform = computed(
  () =>
    (!isTranslate.value ? 'transition: 0.1s ease transform;' : '') +
    `transform: translate3d(${xDelta.value}px, ${yDelta.value}px, 0px)
    scale(${scale.value});`
);

const zoomIn = () => {
  const next = scale.value + 0.25;

  next < 4 ? (scale.value += 0.25) : scale.value;
};

const zoomOut = () => {
  const next = scale.value - 0.25;

  if (next <= 1) {
    endZoom();
    return;
  }

  next > 0.75 ? (scale.value -= 0.25) : scale.value;
};

const distance = (event: TouchEvent) => {
  return Math.hypot(
    event.touches[0].pageX - event.touches[1].pageX,
    event.touches[0].pageY - event.touches[1].pageY
  );
};

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

    const next = scale.value - 0.25;

    if (next <= 1) {
      endZoom();
      return;
    }
  }
};

const startTwoTouch = (ev: TouchEvent) => {
  if (ev.touches.length === 2) {
    ev.preventDefault();

    start.value.x = (ev.touches[0].pageX + ev.touches[1].pageX) / 2;
    start.value.y = (ev.touches[0].pageY + ev.touches[1].pageY) / 2;
    start.value.distance = distance(ev);
  }
};

const moveTwoTouch = (ev: TouchEvent) => {
  if (ev.touches.length === 2) {
    ev.preventDefault();

    const deltaDistance = distance(ev);

    scale.value = Math.min(
      Math.max(1, deltaDistance / start.value.distance),
      4
    );

    xDelta.value =
      ((ev.touches[0].pageX + ev.touches[1].pageX) / 2 - start.value.x) * 2;
    yDelta.value =
      ((ev.touches[0].pageY + ev.touches[1].pageY) / 2 - start.value.y) * 2;
  }
};

const endZoom = () => {
  scale.value = 1;
  yDelta.value = 0;
  xDelta.value = 0;
};

const updateShow = () => {
  const naturalWidth =
    window.innerWidth > support.media.width
      ? support.media.width
      : window.innerWidth;

  width.value =
    support.media.height > window.innerHeight
      ? naturalWidth - naturalWidth * (1 - 105 / 118)
      : naturalWidth;
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
.bott-media {
  &--slide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    flex: 100% 0 0;
    z-index: 0;
    touch-action: none;
    transform-origin: 0 0;
  }
  &--slides {
    position: absolute;
    display: flex;
    height: 100%;
    max-height: 100vh;
    width: 100%;
    overflow: hidden;
    touch-action: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &--content {
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

  &--head {
    display: flex;
    grid-area: 1/1/2/-2;
    position: relative;
    z-index: 3;
    min-width: 0;
    background: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) 100%);
    padding: 0.5rem max(1.25rem, env(safe-area-inset-left));
  }
}

.cursor-drag {
  cursor: grab;
}
</style>
