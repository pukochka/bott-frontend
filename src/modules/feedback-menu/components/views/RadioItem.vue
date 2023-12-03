<template>
  <q-item tag="label" class="rounded">
    <q-item-section avatar>
      <q-toggle
        color="primary"
        v-model="state"
        :model-value="props.model"
        @update:model-value="(val) => $emit('update', val)"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>

      <q-item-label caption>{{ desc }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<RadioItemProps>(), {
  label: '',
  desc: '',
  model: false,
});

const state = ref(false);

interface RadioItemProps {
  label: string;
  desc: string;
  model: boolean;
}
</script>

<style scoped lang="scss"></style>
