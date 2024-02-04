<template>
  <div :class="[isMedia ? ' q-mt-xs' : '']" class="column items-end q-px-sm">
    <div
      class="font-14 text-content row justify-start full-width"
      v-html="textContent"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defaultTicketMessage } from '../../../stores/supportModels';
import { computed } from 'vue';
import { date } from 'quasar';
import { grinding } from '../../../../../utils/helpers/grinding';

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

function parseContent(content: string): string {
  if (content.includes('style')) {
    const el = document.createElement('div');
    el.innerHTML = content;

    // eslint-disable-next-line prefer-rest-params,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nodeList: Array<HTMLElement> = Array.from(el?.childNodes);

    if (!nodeList.length) return el.innerHTML;

    for (const node of nodeList) {
      node.attributes.removeNamedItem('style');

      node.innerHTML = parseContent(node.innerHTML);
    }

    return el.innerHTML;
  }

  return content;
}

interface ChatMessageContentProps {
  message: SupportTicketMessage;
}
</script>

<style scoped lang="scss"></style>
