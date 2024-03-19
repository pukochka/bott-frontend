<template>
  <file-img v-if="aviExt" :name="props.name" :link="props.link">
    <slot v-if="!props.scenarios"></slot>
  </file-img>

  <q-responsive class="absolute-full" v-else>
    <video
      muted
      :style="{ 'object-fit': props.fit, 'object-position': '50% 50%' }"
    >
      <source :src="props.link" />

      Ваш браузер не поддерживает видео HTML5.
    </video>

    <div class="q-img__content">
      <slot v-if="!props.scenarios"></slot>
    </div>
  </q-responsive>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import FileImg from './MediaImage.vue';

const props = withDefaults(defineProps<MediaVideoProps>(), {
  link: '',
  name: '',
  fit: 'cover',
  scenarios: false,
});

const aviExt = computed(
  () => props.name.slice(props.name.lastIndexOf('.') + 1) === 'avi'
);

interface MediaVideoProps {
  link: string;
  name: string;
  fit?: 'cover' | 'contain';
  scenarios?: boolean;
}
</script>

<style scoped lang="scss"></style>
