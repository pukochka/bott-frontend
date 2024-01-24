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
            <div class="column q-gutter-y-sm q-py-sm">
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
      :showing="loading"
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

const loading = ref(true);
const color = ref(1);
const chat = ref();
const bottom = ref();

const firstMessageDate = computed(() =>
  date.formatDate(Date.parse(support.messages[0]?.created_at), 'DD MMM')
);

onBeforeMount(() => {
  color.value = Math.floor(Math.random() * chatColors.length);
  loading.value = true;

  support.updateMessages().then(() => {
    loading.value = false;
    setTimeout(support.scrollToBottom.bind(support), 10);
  });
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
</style>
