<template>
  <q-scroll-area :style="style" @scroll="onScroll" :thumb-style="thumbStyle">
    <q-list
      :class="[role === 'row' ? 'row' : '']"
      :bordered="bordered"
      :separator="separator"
    >
      <slot v-for="(item, index) of loadItems" v-bind="{ item, index }" />
    </q-list>

    <div class="absolute-full column flex-center" v-if="loadItems.length === 0">
      <q-icon name="search" color="primary" size="32px" />

      <div class="text-subtitle1">К сожалению ничего не нашлось...</div>
    </div>
  </q-scroll-area>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<ScrollUpdateProps>(), {
  items: () => [],
  visibleItems: () => 20,
  height: () => 400,
  bordered: () => false,
  separator: () => false,
  role: () => 'list',
});

const indexItems = ref(props.visibleItems);

const loadItems = computed(() =>
  (props.items ?? []).filter((_, index) => index < indexItems.value)
);

const style = computed(() => {
  return {
    maxHeight: props.height + 'px',
    height: props.height + 'px',
  };
});

const onScroll = ({ verticalPercentage }: any) => {
  if (verticalPercentage > 0.8) indexItems.value += props.visibleItems;
};

const thumbStyle = {
  background: 'primary',
};

interface ScrollUpdateProps {
  height?: number;
  visibleItems?: number;
  items: Array<any> | null | undefined;
  bordered?: boolean;
  separator?: boolean;
  notFound?: boolean;
  role?: 'list' | 'row';
}
</script>

<style lang="scss" scoped></style>
