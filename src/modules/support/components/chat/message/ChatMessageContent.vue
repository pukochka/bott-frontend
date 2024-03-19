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

import { replaceUnsolvableTags } from 'src/utils/helpers/replace';
import { getMessageTime } from '../../../utils/messageMeta';

const props = withDefaults(defineProps<ChatMessageContentProps>(), {
  message: () => defaultTicketMessage,
});

const isMedia = computed(() => ![0, 2].includes(props.message.message.type.id));

const textContent = computed(
  () => replaceUnsolvableTags(props.message.message.text) + time.value
);

const time = computed(
  () =>
    `<span class="message-meta"><span class="q-mx-xs">${getMessageTime(
      props.message.created_at
    )}</span></span>`
);

interface ChatMessageContentProps {
  message: SupportTicketMessage;
}
</script>

<style scoped lang="scss"></style>
