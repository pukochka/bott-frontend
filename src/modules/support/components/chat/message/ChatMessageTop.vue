<template>
  <div
    class="row items-center justify-between text-primary q-mx-xs"
    :class="[props.status ? ' justify-end reverse' : '']"
  >
    <q-btn outline padding="0 4px" color="primary" class="rounded">
      <div class="text-caption text-weight-bold" v-html="messageSender"></div>

      <q-menu class="bott-portal-menu">
        <q-list dense>
          <q-item clickable v-close-popup @click="copy">
            <q-item-section avatar>
              <q-icon :name="mdiContentCopy" color="primary" size="22px" />
            </q-item-section>

            <q-item-section>
              <div v-html="username"></div>
            </q-item-section>

            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Скопировать
            </q-tooltip>
          </q-item>

          <q-item clickable v-close-popup :href="userLink" target="_blank">
            <q-item-section avatar>
              <q-icon :name="mdiTelegram" color="primary" size="26px" />
            </q-item-section>

            <q-item-section>Перейти в телеграм</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn
      flat
      padding="2px"
      size="10px"
      color="primary"
      icon="launch"
      target="_blank"
      :href="messageLink"
      v-if="isMedia"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Открыть в телеграме
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { computed } from 'vue';

import { TG_DESKTOP } from '../../../utils/common';
import { defaultTicketMessage } from '../../../stores/supportModels';

import { copyToClipboard } from 'quasar';
import { grinding } from 'src/utils/helpers/grinding';

import { mdiContentCopy, mdiTelegram } from '@quasar/extras/mdi-v5';

const props = withDefaults(defineProps<ChatMessageTopProps>(), {
  message: () => defaultTicketMessage,
});

const isMedia = computed(() => ![0, 2].includes(props.message.message.type.id));

const messageSender = computed(
  () => props.message?.user.first_name + ' ' + props.message.user.last_name
);

const messageLink = computed(
  () => TG_DESKTOP + config.bot.name + '?start=f_' + props.message.message.id
);

const username = computed(() =>
  grinding(
    props.message.user.link.includes('tg://user')
      ? props.message.user.link.slice(
          props.message.user.link.indexOf("'") + 1,
          props.message.user.link.lastIndexOf("'")
        )
      : props.message.user.link
  )
);

const userLink = computed(() => {
  if (props.message.user.link.includes('tg://user')) {
    const start = props.message.user.link.indexOf("'") + 1;
    const end = props.message.user.link.lastIndexOf("'");

    return props.message.user.link.slice(start ?? 6, end);
  }

  return TG_DESKTOP + props.message.user.link.slice(1);
});

const copy = () => {
  const el = document.createElement('div');
  el.innerHTML = props.message.user.link;

  copyToClipboard(el.textContent ?? '');
};

interface ChatMessageTopProps {
  message: SupportTicketMessage;
  status: boolean;
}
</script>

<style scoped lang="scss"></style>
