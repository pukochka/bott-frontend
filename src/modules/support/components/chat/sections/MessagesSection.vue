<template>
  <q-layout view="lHh lpR lff" container class="bott-layout__drawer">
    <q-page-container>
      <drawer-info></drawer-info>

      <q-page>
        <q-scroll-area
          ref="chat"
          class="q-px-md absolute-full"
          :thumb-style="thumbStyle"
          style="margin: 40px 0 57px 0"
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
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ChatMessage from '../../items/ChatMessage.vue';
import DrawerInfo from './DrawerInfo.vue';
import { useSupportStore } from '../../../stores/supportStore';
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';

const support = useSupportStore();

const chat = ref();
const bottom = ref();

const firstMessageDate = computed(() =>
  date.formatDate(Date.parse(support.messages[0].created_at), 'DD MMM')
);

onMounted(() => {
  support.scroll = chat;
  support.scroll_bottom = bottom;

  support.scrollToBottom();
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

<style scoped lang="scss"></style>
