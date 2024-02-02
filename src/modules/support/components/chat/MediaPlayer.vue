<template>
  <q-dialog
    maximized
    v-model="support.dialogs.media_player"
    transition-show="fade"
    transition-hide="fade"
    transition-duration="200"
    @before-hide="updateHide"
  >
    <div class="media-player">
      <div class="absolute-full flex flex-center" v-if="support.media.isVideo">
        <video controls>
          <source :src="support.media.link" />
        </video>
      </div>

      <q-img
        v-else
        @wheel="handleWheel"
        :src="support.media.link"
        :style="{ transform: `scale(${scale})` }"
        class="overflow-hidden"
        spinner-color="primary"
        spinner-size="82px"
        fit="contain"
        width="calc(100vw - 20px)"
        height="calc(100vh - 20px)"
      />

      <q-btn
        square
        unelevated
        size="md"
        color="primary"
        icon="close"
        class="absolute-top-right"
        v-close-popup
      />
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

const support = useSupportStore();

const scale = ref(1);

const handleWheel = (ev: WheelEvent) => {
  const next = scale.value + 0.2;
  const prev = scale.value - 0.2;

  if (ev.deltaY < 0 && next < 3) {
    scale.value += 0.2;
  }

  if (ev.deltaY > 0 && prev > 0.4) {
    scale.value -= 0.2;
  }
};

//
const updateHide = () => {
  scale.value = 1;
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
</style>
