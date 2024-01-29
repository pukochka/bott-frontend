<template>
  <div class="relative-position">
    <q-layout
      view="hhh LpR fFr"
      container
      class="bott-layout__drawer bott-page__background"
      :style="{ height: `calc(100vh - 65px - ${support.offsetTop}px)` }"
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
            <div class="chat-area column q-gutter-y-xs q-py-sm">
              <q-chip
                dense
                color="grey"
                text-color="white"
                class="self-center q-my-md"
              >
                Начало диалога {{ firstMessageDate }}
              </q-chip>

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

        <q-footer class="bg-transparent row justify-center">
          <bottom-section></bottom-section>
        </q-footer>
      </q-page-container>
    </q-layout>

    <q-inner-loading
      :showing="support.loading.chat"
      class="bott-page__background"
      transition-show="none"
    >
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { chatColors, months } from '../../utils/common';

import { useSupportStore } from '../../stores/supportStore';

import TopSection from './sections/TopSection.vue';
import BottomSection from './sections/BottomSection.vue';
import ChatMessage from '../items/ChatMessage.vue';
import DrawerInfo from './sections/DrawerInfo.vue';

const support = useSupportStore();

const chat = ref();
const bottom = ref();

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
.chat-area {
  max-width: 900px;
  margin: 0 auto;
}
</style>
