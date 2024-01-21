<template>
  <div
    class="relative-position q-mx-sm"
    :class="[status ? ' self-end' : ' self-start']"
  >
    <q-card
      flat
      class="q-pt-xs q-px-sm"
      :class="[status ? ' rounded-none-right' : ' rounded-none-left']"
      :style="{ 'max-width': '450px' }"
    >
      <div
        class="row text-primary"
        :class="[status ? ' justify-end q-mr-xs' : ' q-ml-xs']"
      >
        <q-btn flat padding="0" color="primary" class="rounded">
          <div class="text-caption text-weight-bold" v-html="name"></div>

          <q-menu class="bott-portal-menu">
            <q-list dense>
              <q-item clickable v-close-popup :href="link" target="_blank">
                <q-item-section>Перейти в телеграм</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="column items-end">
        <div
          class="font-14 text-break row justify-start full-width"
          v-html="message.message.text"
        ></div>

        <div class="text-caption self-end">{{ message.created_at }}</div>
      </div>
    </q-card>

    <message-appendix
      v-if="appendix"
      :style="{
        transform: !status ? 'scale(-1, 1)' : '',
        left: !status ? '-8px' : '',
        right: status ? '-8px' : '',
      }"
    ></message-appendix>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { defaultTicketMessage } from '../../stores/supportModels';
import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import { useSupportStore } from '../../stores/supportStore';

import MessageAppendix from '../../../../components/emoji/MessageAppendix.vue';

const props = withDefaults(defineProps<ChatMessageProps>(), {
  message: () => defaultTicketMessage,
  index: 0,
});

const support = useSupportStore();

const link = computed(() => {
  if (props.message.user.link.includes('tg://user')) {
    const start = props.message.user.link.indexOf("'") + 1;
    const end = props.message.user.link.lastIndexOf("'");

    return props.message.user.link.slice(start ?? 6, end);
  }

  return 'https://t.me/' + props.message.user.link.slice(1);
});

const name = computed(
  () => props.message?.user.first_name + ' ' + props.message.user.last_name
);

const status = computed(
  () => props.message.user.id !== support.selectedTicket?.user?.id
);

const appendix = computed(
  () =>
    (support.messages[props.index + 1] ?? defaultMessage)?.user?.id !==
    props.message.user.id
);

interface ChatMessageProps {
  message: SupportTicketMessage;
  index: number;
}
</script>

<style scoped lang="scss">
.text-break {
  word-break: break-word;
}

.rounded-none-left {
  border-radius: 10px 10px 10px 0;
}
.rounded-none-right {
  border-radius: 10px 10px 0 10px;
}
</style>
