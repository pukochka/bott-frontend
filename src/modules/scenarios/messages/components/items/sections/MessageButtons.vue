<template>
  <div :class="[length ? '' : 'q-ma-none']">
    <q-list bordered separator dense class="rounded" v-if="length">
      <button-item
        :message="message"
        :button="button"
        v-for="button in buttons"
        :key="button.id"
      ></button-item>
    </q-list>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';

import { defaultMessage } from 'src/utils/helpers/defaults';

import { update, useVectorStore } from '../../../stores/vector/vectorStore';

import ButtonItem from '../ButtonItem.vue';

const props = withDefaults(defineProps<MessageButtonsProps>(), {
  message: () => defaultMessage,
});

const vector = useVectorStore();

const length = computed(() => props.message.menu?.lines?.length ?? 0);

const buttons = computed((): IMButton[] =>
  props.message.menu !== null
    ? props.message.menu.lines.map((line) => line.buttons).flat()
    : []
);

watch(
  buttons,
  () => {
    update(buttons.value);
  },
  { deep: true }
);

interface MessageButtonsProps {
  message: MessageFree;
}
</script>
