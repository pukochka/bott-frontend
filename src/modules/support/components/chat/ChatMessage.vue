<template>
  <div
    class="relative-position q-mx-sm"
    :class="[status ? ' self-end' : ' self-start']"
  >
    <q-card
      flat
      class="q-pt-xs"
      :class="[status ? ' rounded-none-right' : ' rounded-none-left']"
      :style="{ 'max-width': '450px' }"
    >
      <chat-message-top
        :status="status"
        :message="props.message"
      ></chat-message-top>

      <component
        v-if="isMedia"
        :is="media"
        :message="props.message.message"
      ></component>

      <chat-message-content :message="props.message"></chat-message-content>
    </q-card>

    <message-appendix
      v-if="appendix"
      :style="{
        transform: !status ? 'scale(-1, 1)' : '',
        left: !status ? '-9px' : '',
        right: status ? '-9px' : '',
      }"
    ></message-appendix>
  </div>

  <q-chip
    v-if="dateView.length"
    dense
    color="grey"
    text-color="white"
    class="self-center q-my-md"
  >
    {{ dateView }}
  </q-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { date } from 'quasar';

import { defaultTicketMessage } from '../../stores/supportModels';
import { mediaComponents, months } from '../../utils/common';

import { useSupportStore } from '../../stores/supportStore';

import MessageAppendix from 'src/components/emoji/MessageAppendix.vue';
import ChatMessageTop from './message/ChatMessageTop.vue';
import ChatMessageContent from './message/ChatMessageContent.vue';

const props = withDefaults(defineProps<ChatMessageProps>(), {
  message: () => defaultTicketMessage,
  index: 0,
});

const support = useSupportStore();

const isMedia = computed(() => ![0, 2].includes(props.message.message.type.id));

const media = computed(() => mediaComponents[props.message.message.type.id]);

const status = computed(
  () => props.message.user.id !== support.selectedTicket?.user?.id
);

const time = computed(() => Date.parse(props.message.created_at));

const appendix = computed(
  () => support.messages[props.index + 1]?.user?.id !== props.message.user.id
);

const dateView = computed(() => {
  const now = date.formatDate(time.value, 'DD');
  const next = Date.parse(support.messages[props.index + 1]?.created_at);

  const day = date.formatDate(next, 'DD');
  const month = months[new Date(next).getMonth()] ?? '';

  return now !== day && day !== void 0 ? day + ' ' + month : '';
});

interface ChatMessageProps {
  message: SupportTicketMessage;
  index: number;
}
</script>

<style scoped lang="scss">
.rounded-none-left {
  border-radius: 10px 10px 10px 0;
}
.rounded-none-right {
  border-radius: 10px 10px 0 10px;
}
</style>
