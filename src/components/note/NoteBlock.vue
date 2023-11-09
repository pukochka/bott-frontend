<template>
  <div class="bott-note__block border__wide font-14" :class="[colorClass]">
    <div class="bott-note__title" v-if="props.label !== ''">
      {{ props.label }}
    </div>

    <!--    <p v-for="(t, index) of props.text" :key="index">{{ t }}</p>-->

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex
      minus molestiae placeat quasi, repudiandae similique! Aut enim facilis
      fuga quibusdam sequi? Dignissimos doloremque, excepturi facilis iste nihil
      officia sint.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ex
      minus molestiae placeat quasi, repudiandae similique! Aut enim facilis
      fuga quibusdam sequi? Dignissimos doloremque, excepturi facilis iste nihil
      officia sint.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<NoteBlockProps>(), {
  label: '',
  text: () => [],
  color: 'primary',
});

const colorClass = computed(() => 'bott-note__block-' + props.color);

interface NoteBlockProps {
  label?: string;
  text?: Array<string>;
  color?: 'primary' | 'success' | 'negative' | 'neutral' | 'warning' | 'prism';
}
</script>

<style lang="scss" scoped></style>
