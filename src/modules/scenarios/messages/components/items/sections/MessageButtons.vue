<template>
  <div
    class="text-caption text-center text-grey q-pt-sm"
    v-if="!length && props.message.inline_menu"
  >
    Перейдите в настройки кнопок, чтобы добавить кнопку
  </div>

  <div class="">
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
import { t } from 'src/boot/lang';
import { defaultMessage } from '../../../stores/deafults';

import ButtonItem from '../ButtonItem.vue';

const props = withDefaults(defineProps<MessageButtonsProps>(), {
  message: () => defaultMessage,
});

const length = computed(() => props.message.inline_menu?.lines?.length ?? 0);

const buttons = computed((): IMButton[] =>
  props.message.inline_menu !== null
    ? props.message.inline_menu.lines.map((line) => line.buttons).flat()
    : []
);

interface MessageButtonsProps {
  message: SCMessage;
}
</script>