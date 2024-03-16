<template>
  <div :class="[isMedia ? ' q-mt-xs' : '']" class="column items-end q-px-sm">
    <div
      class="font-14 text-content row justify-start full-width"
      v-html="textContent"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultTicketMessage } from '../../../stores/supportModels';

import { date } from 'quasar';
import { grinding } from 'src/utils/helpers/grinding';
import { parseContent } from '../../../utils/common';

const props = withDefaults(defineProps<ChatMessageContentProps>(), {
  message: () => defaultTicketMessage,
});

const isMedia = computed(() => ![0, 2].includes(props.message.message.type.id));

const textContent = computed(
  () => grinding(parseContent(props.message.message.text)) + formattedTime.value
);

const time = computed(() => Date.parse(props.message.created_at));

const formattedTime = computed(
  () =>
    `<span class="message-meta"><span class="text-caption self-end text-grey q-mx-xs non-selectable">${date.formatDate(
      time.value,
      'HH:mm'
    )}</span></span>`
);

interface ChatMessageContentProps {
  message: SupportTicketMessage;
}
</script>

<style scoped lang="scss"></style>
