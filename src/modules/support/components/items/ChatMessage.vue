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
        :class="[status ? ' justify-end q-mr-xs' : '']"
      >
        <q-btn outline padding="0 4px" color="primary" class="rounded">
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

      <q-btn
        v-if="![0, 2].includes(message.message.type.id)"
        no-caps
        dense
        flat
        target="_blank"
        :href="messageLink"
        class="rounded full-width q-my-sm"
        color="primary"
        :label="buttonViewLabel"
      />

      <div class="column items-end">
        <div
          class="font-14 text-content row justify-start full-width"
          v-html="textContent"
        ></div>
      </div>
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
import { config } from '../../config';
import { date } from 'quasar';
import { defaultTicketMessage } from '../../stores/supportModels';

import { useSupportStore } from '../../stores/supportStore';

import MessageAppendix from 'src/components/emoji/MessageAppendix.vue';

import { btnViewText, telegramLink } from '../../utils/common';

const props = withDefaults(defineProps<ChatMessageProps>(), {
  message: () => defaultTicketMessage,
  index: 0,
});

const support = useSupportStore();

const buttonViewLabel = computed(
  () => 'Просмотреть ' + (btnViewText[props.message.message.type.type] ?? '')
);

const textContent = computed(
  () =>
    props.message.message.text +
    `<span class="message-meta"><span class="text-caption self-end text-grey q-mx-xs">${format.value}</span></span>`
);

const link = computed(() => {
  if (props.message.user.link.includes('tg://user')) {
    const start = props.message.user.link.indexOf("'") + 1;
    const end = props.message.user.link.lastIndexOf("'");

    return props.message.user.link.slice(start ?? 6, end);
  }

  return telegramLink + props.message.user.link.slice(1);
});

const messageLink = computed(
  () => telegramLink + config.bot.name + '?start=f_' + props.message.message.id
);

const name = computed(
  () => props.message?.user.first_name + ' ' + props.message.user.last_name
);

const status = computed(
  () => props.message.user.id !== support.selectedTicket?.user?.id
);

const time = computed(() => Date.parse(props.message.created_at));

const format = computed(() => date.formatDate(time.value, 'HH:mm'));

const appendix = computed(
  () => support.messages[props.index + 1]?.user?.id !== props.message.user.id
);

const dateView = computed(() => {
  const now = date.formatDate(time.value, 'DD');
  const next = Date.parse(support.messages[props.index + 1]?.created_at);

  const format = date.formatDate(next, 'DD');
  const formatMonth = date.formatDate(next, 'DD MMM');

  return now !== format && format !== void 0 ? formatMonth : '';
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
