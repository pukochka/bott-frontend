<template>
  <div class="ellipsis-1-line row">
    <div ref="height" class="col-11">{{ props.row.title }}</div>

    <div class="col-1">{{ dots }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const vmProps = withDefaults(defineProps<SectionProps>(), {
  props: {},
});

const dots = ref('');
const height = ref<HTMLElement | null>(null);

onMounted(() => {
  if ((height.value?.offsetHeight ?? 0) > 30) {
    dots.value = '...';
  }
});

interface SectionProps {
  props: any;
}
</script>

<style lang="scss" scoped>
.ellipsis-1-line {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-height: 18px;
}
</style>
