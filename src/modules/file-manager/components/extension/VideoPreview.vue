<template>
  <file-img v-if="aviExt" :name="props.name" :link="props.link">
    <slot></slot>
  </file-img>

  <q-responsive class="absolute-full" v-else>
    <video
      muted
      :style="{ 'object-fit': data.imageFit, 'object-position': '50% 50%' }">
      <source :src="props.link" />

      Ваш браузер не поддерживает видео HTML5.
    </video>

    <div class="q-img__content">
      <slot></slot>
    </div>
  </q-responsive>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFileStore } from '../../stores/fileStore';

import FileImg from './FileImg.vue';

const props = withDefaults(defineProps<VideoPreviewProps>(), {
  link: '',
  name: '',
});

const data = useFileStore();

const aviExt = computed(
  () => props.name.slice(props.name.lastIndexOf('.') + 1) === 'avi'
);

interface VideoPreviewProps {
  link: string;
  name: string;
}
</script>

<style scoped lang="scss"></style>
