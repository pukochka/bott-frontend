<template>
  <q-item
    clickable
    class="non-selectable"
    :disable="button.disable"
    @click="button.action"
  >
    <q-item-section avatar>
      <q-icon :name="button.icon" :color="button.color" size="22px" />
    </q-item-section>

    <q-item-section>{{ button.label }}</q-item-section>

    <q-item-section side v-if="button.sortable">
      <q-icon :name="icon" color="primary" size="22px" />
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import { useFileStore } from '../../stores/fileStore';

import { defaultActionButton } from '../../stores/fileModels';

const props = withDefaults(defineProps<ActionButtonProps>(), {
  button: () => defaultActionButton,
});

const data = useFileStore();

const icon = computed(() =>
  props.button?.sortable === 'compress'
    ? 'check'
    : data.sortable[props.button?.sortable] === false
    ? 'arrow_downward'
    : data.sortable[props.button?.sortable]
    ? 'arrow_upward'
    : ''
);

interface ActionButtonProps {
  button: any;
}
</script>

<style scoped lang="scss"></style>
