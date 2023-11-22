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
import { computed } from 'vue';

import { defaultMessage } from '../../../stores/deafults';

import ButtonItem from '../ButtonItem.vue';

const props = withDefaults(defineProps<MessageButtonsProps>(), {
  message: () => defaultMessage,
});

const length = computed(() => props.message.menu?.lines?.length ?? 0);

const buttons = computed((): IMButton[] =>
  props.message.menu !== null
    ? props.message.menu.lines.map((line) => line.buttons).flat()
    : []
);

interface MessageButtonsProps {
  message: MessageFree;
}
</script>
