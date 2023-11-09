<template>
  <q-img
    :fit="data.imageFit"
    class="fit cursor-pointer non-selectable"
    :src="props.link"
    spinner-color="primary"
    spinner-size="42px"
    :ratio="1 / 2"
  >
    <slot></slot>
  </q-img>
</template>

<script setup lang="ts">
import { useFMStore } from '../../stores/FMStrore';

const props = withDefaults(defineProps<ImageImgProps>(), {
  link: '',
  name: '',
});

const data = useFMStore();

interface ImageImgProps {
  link: string;
  name: string;
}
</script>

<style scoped lang="scss"></style>
