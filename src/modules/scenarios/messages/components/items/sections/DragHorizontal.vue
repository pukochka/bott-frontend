<template>
  <transition name="fade">
    <div
      @mouseup="sortMessage"
      class="full-width"
      :style="floating ? { top: '-30px', left: 0 } : ''"
      :class="[floating ? ' absolute' : 'relative-position']"
    >
      <q-tooltip
        transition-show="fade"
        transition-hide="fade"
        anchor="center middle"
        self="center middle"
        class="bg-red rounded"
      >
        {{ t('move') }}
      </q-tooltip>

      <svg width="370" height="4">
        <line x1="0" x2="370" stroke-width="3px" stroke="orange"></line>
      </svg>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { t } from 'src/boot/lang';

import { fetchColumn } from '../../../api';

import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

const props = withDefaults(defineProps<DragHorizontalProps>(), {
  sort: () => 0,
  column_id: () => 0,
  floating: () => false,
});

const states = useStatesStore();
const data = useDataStore();

const sortMessage = () => {
  fetchColumn('change-sort-and-column', {
    route_id: data.scenarioValue?.id ?? 0,
    message_id: states.dragValue.el?.id ?? 0,
    column_id: props.column_id,
    sort: props.sort,
  });
};

interface DragHorizontalProps {
  sort: number;
  column_id: number;
  floating?: boolean;
}
</script>
<style lang="scss"></style>
