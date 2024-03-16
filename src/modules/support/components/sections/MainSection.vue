<template>
  <q-splitter
    splitterModel
    class="overflow-hidden"
    :style="style"
    v-model="support.splitterModel"
    @update:model-value="support.updateChatActionButtons"
  >
    <template v-slot:before>
      <left-panel></left-panel>
    </template>

    <template v-slot:after>
      <right-panel></right-panel>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import LeftPanel from './LeftPanel.vue';
import RightPanel from './RightPanel.vue';

const support = useSupportStore();

const style = computed(() => `height: calc(100vh - ${support.offsetTop}px)`);
</script>

<style scoped lang="scss"></style>
