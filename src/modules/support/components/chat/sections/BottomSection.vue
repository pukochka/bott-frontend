<template>
  <div class="row full-width transition-height" style="max-width: 900px">
    <div
      class="col"
      v-if="config.user_id === support.selectedTicket?.manager?.id"
    >
      <div
        class="row q-col-gutter-x-sm no-wrap q-ma-xs transition-height"
        @keydown.enter="sendMessage"
      >
        <div class="col relative-position">
          <div
            class="border-bottom-right-none bg-card overflow-hidden row items-end transition-height"
          >
            <div class="q-px-sm q-pb-sm">
              <emoji-menu @select="addEmoji"></emoji-menu>
            </div>

            <div class="col relative-position transition-height">
              <span
                class="input-placeholder non-selectable no-pointer-events"
                v-if="placeholder"
              >
                Сообщение
              </span>

              <div
                ref="chatInput"
                contenteditable="true"
                class="bott-message-input input-text-color transition-height"
                style="overflow-y: scroll"
                @keyup="updateText"
                @keydown="updateText"
              ></div>
            </div>
          </div>

          <message-appendix style="right: -9px"></message-appendix>
        </div>

        <div class="row items-end">
          <div class="bg-card round">
            <q-btn
              flat
              round
              padding="16px"
              size="md"
              color="primary"
              icon="send"
              :loading="loading"
              @click="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col row justify-center" v-else>
      <q-chip
        dense
        color="grey"
        text-color="white"
        class="self-center q-my-md text-caption"
      >
        Для отправки сообщений Вам нужно быть исполнителем тикета
      </q-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../config';

import { ref } from 'vue';
import { fetchSupportMessages } from '../../../api/queries';
import { useSupportStore } from '../../../stores/supportStore';

import MessageAppendix from 'src/components/emoji/MessageAppendix.vue';
import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';

const support = useSupportStore();

const text = ref('');
const chatInput = ref();
const loading = ref(false);
const placeholder = ref(true);

const addEmoji = (value: string) => {
  chatInput.value.innerHTML += value;

  placeholder.value = chatInput.value.textContent?.length === 0;
};

const updateText = (event: KeyboardEvent) => {
  if (event.keyCode === 13 && placeholder.value) {
    event.preventDefault();
    return;
  }

  placeholder.value = chatInput.value.textContent?.length === 0;

  text.value = chatInput.value.innerHTML;
};

const sendMessage = (event: KeyboardEvent) => {
  if (event.shiftKey) return;

  if (placeholder.value) return;

  loading.value = true;
  event.preventDefault();

  fetchSupportMessages(
    'implementer-write',
    {
      ticket_id: support.selectedTicket?.id ?? -1,
      text: text.value,
      limit: 50,
    },
    (response) => {
      text.value = '';
      chatInput.value.innerHTML = '';
      placeholder.value = true;
      support.messages = response;
      setTimeout(support.scrollToBottom.bind(support), 10);
    }
  ).then(() => {
    loading.value = false;
  });
};
</script>

<style scoped lang="scss">
.max-height-150 {
  max-height: 150px;
}

.border-bottom-right-none {
  border-radius: 16px 16px 0 16px;
}

.round {
  border-radius: 50%;
}

.input-text-color {
  color: #1d1d1d;
}

.input-placeholder {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  color: #a2acb4;
}

body.body--dark {
  .input-text-color {
    color: #ffffff;
  }
}

.transition-height {
  transition: 0.3s height;
}
</style>
