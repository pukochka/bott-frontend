<template>
  <q-list>
    <q-item
      clickable
      v-ripple
      v-for="([type, data], index) of Object.entries(types)"
      :key="index"
      @click="emit('create', Number(type))"
    >
      <q-item-section avatar :style="{ color: data.color }">
        <q-icon :name="data.icon" size="22px" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ data.label }}</q-item-label>

        <q-item-label caption>{{ data.description }}</q-item-label>
      </q-item-section>

      <q-checkbox
        v-if="props.selected"
        class="absolute-top-right"
        :model-value="props.selected === Number(type)"
        size="30px"
      />
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { types } from '../message/models';

const props = withDefaults(defineProps<TypesQuestionListProps>(), {
  selected: undefined,
});

const emit = defineEmits<{
  (e: 'create', value: number): void;
}>();

interface TypesQuestionListProps {
  selected?: number;
}
</script>

<style scoped lang="scss"></style>
