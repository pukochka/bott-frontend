<template>
  <div :class="viewClasses" class="">
    {{ info.label }} <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<ViewContentProps>(), {
  status: 0,
  badged: false,
  content: () => {
    return { 1: { label: '', color: '' } };
  },
});

const viewClasses = computed(
  () =>
    (props.badged ? 'bordered bott-note__block-' : 'text-color--') +
    info.value.color
);

const info = computed(() => props.content?.[props.status] ?? err);

const err = {
  title: '))',
  color: '',
};

interface ViewContentProps {
  status: number;
  content: any;
  badged?: boolean;
}
</script>

<style lang="scss" scoped></style>
