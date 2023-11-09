<template>
  <div class="row items-center no-wrap">
    <div class="" v-for="(action, index) of actions" :key="index">
      <q-btn
        v-if="action.condition"
        square
        dense
        flat
        size="md"
        color="primary"
        :icon="action.icon"
      >
        <q-tooltip
          v-if="action.tooltip"
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          {{ action.tooltip }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import {
  mdiDotsVertical,
  mdiBasket,
  mdiVectorArrangeBelow,
} from '@quasar/extras/mdi-v7';

const vmProps = withDefaults(defineProps<SectionProps>(), {
  props: {},
  products: () => [],
});

const actions = computed(() => [
  {
    tooltip: 'Управление категорией',
    icon: mdiVectorArrangeBelow,
    action: '',
    condition: vmProps.props?.row?.type === 0,
  },
  {
    tooltip: 'Управление товаром',
    icon: mdiBasket,
    action: '',
    condition: vmProps.props?.row?.type !== 0,
  },
  {
    tooltip: null,
    icon: mdiDotsVertical,
    action: '',
    condition: true,
  },
  {
    tooltip: 'Переместить выше',
    icon: 'expand_less',
    action: '',
    condition: vmProps.props?.rowIndex !== 0,
  },
  {
    tooltip: 'Переместить ниже',
    icon: 'expand_more',
    action: '',
    condition: vmProps.props?.rowIndex !== vmProps.products.length - 1,
  },
]);

interface SectionProps {
  props: any;
  products: Array<any>;
}
</script>

<style lang="scss" scoped></style>
