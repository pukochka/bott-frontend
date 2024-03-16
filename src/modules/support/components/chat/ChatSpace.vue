<template>
  <div class="relative-position">
    <q-layout
      container
      view="hhh LpR fFr"
      class="bott-page__layout bott-page__background"
      :style="{ height: `calc(100vh - ${support.offsetTop}px)` }"
    >
      <q-page-container :style="{ background: color }">
        <q-header>
          <top-section></top-section>
        </q-header>

        <drawer-info></drawer-info>

        <q-page>
          <q-scroll-area
            ref="chat"
            class="q-px-md absolute-full"
            :thumb-style="thumbStyle"
          >
            <div class="bott-chat--area column q-gutter-y-xs q-py-sm">
              <q-chip
                dense
                color="grey"
                text-color="white"
                class="self-center q-my-md"
                v-if="!support.loading.chat"
              >
                Начало диалога {{ firstMessageDate }}
              </q-chip>

              <q-inner-loading
                class="bg-transparent"
                :showing="support.loading.chat"
              >
                <div class="column q-gutter-y-sm absolute full-width">
                  <q-skeleton
                    v-for="(item, index) in heights"
                    :key="item"
                    :height="item + 'px'"
                    :class="[index % 2 ? 'self-end' : '']"
                    class="rounded bott-chat--area-skeleton"
                  />
                </div>
              </q-inner-loading>

              <chat-message
                v-for="(message, index) of support.messages"
                :key="message.id"
                :message="message"
                :index="index"
              ></chat-message>

              <div ref="bottom"></div>
            </div>
          </q-scroll-area>
        </q-page>

        <q-footer
          v-if="!support.loading.chat"
          class="bg-transparent row justify-center"
        >
          <bottom-section></bottom-section>
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue';
import { chatColors, months } from '../../utils/common';

import { useSupportStore } from '../../stores/supportStore';

import TopSection from './sections/TopSection.vue';
import BottomSection from './sections/BottomSection.vue';
import ChatMessage from './ChatMessage.vue';
import DrawerInfo from './sections/DrawerInfo.vue';

const support = useSupportStore();

const chat = ref();
const bottom = ref();

const heights = [140, 100, 90, 160, 50, 80, 140];

const color = computed(
  () => chatColors[support.selectedTicket?.status ?? 1] ?? ''
);

const firstMessageDate = computed(() => {
  const timestamp = Date.parse(support.messages[0]?.created_at) ?? '';

  const day = date.formatDate(timestamp, 'DD');
  const month = months[new Date(timestamp).getMonth()] ?? '';

  return day + ' ' + month;
});

onMounted(() => {
  support.scrollRef = chat;
  support.chatBottomRef = bottom;
});

onUnmounted(() => {
  support.messages = [];
  support.selectedTicket = null;
});

onUpdated(support.scrollToBottom.bind(support));

const thumbStyle = {
  width: '8px',
  opacity: '1',
  backgroundColor: 'var(--q-primary)',
  borderRadius: '10px',
  border: '4px solid rgba(0, 0, 0, 0)',
  margin: '2px',
};
</script>

<style lang="scss" scoped>
.bg-page {
  background: #fafafa;
}
.bott-chat--area {
  max-width: 900px;
  margin: 0 auto;
  &-skeleton {
    max-width: 450px;
    width: 100%;
  }
}
</style>
