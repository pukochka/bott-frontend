<template>
  <div class="">{{ price }}</div>
</template>

<script lang="ts" setup>
import 'src/utils/polifils';
import { computed } from 'vue';

const vmProps = withDefaults(defineProps<SectionProps>(), {
  props: {},
});

console.log();

const price = computed(() => vmProps.props.row?.price?.comma());

interface SectionProps {
  props: any;
}
</script>

<style lang="scss" scoped></style>
