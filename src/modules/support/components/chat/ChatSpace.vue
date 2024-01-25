<template>
  <div class="relative-position">
    <q-layout
      view="lHh lpR lff"
      container
      class="bott-layout__drawer bott-page__background"
      style="min-height: 600px"
    >
      <q-page-container :style="{ background: chatColors[color] }">
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

        <q-footer>
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
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { chatColors } from '../../utils/common';

import { useSupportStore } from '../../stores/supportStore';

import TopSection from './sections/TopSection.vue';
import BottomSection from './sections/BottomSection.vue';
import ChatMessage from '../items/ChatMessage.vue';
import DrawerInfo from './sections/DrawerInfo.vue';

const support = useSupportStore();

const color = ref(0);
const chat = ref();
const bottom = ref();

const firstMessageDate = computed(() =>
  date.formatDate(Date.parse(support.messages[0]?.created_at), 'DD MMM')
);

onBeforeMount(() => {
  color.value = Math.floor(Math.random() * chatColors.length);
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
