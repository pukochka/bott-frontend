<template>
  <div v-if="inline.message.type.id === 7">
    <timer-card
      :message="inline.message"
      @update-time="updateTime"
    ></timer-card>
  </div>

  <div v-else>
    <div
      id="message"
      class="editor-text no-prosemirror text-body2 text-content ellipsis-2-lines"
      v-html="text"
    ></div>

    <div class="row q-pt-sm">
      <q-btn
        no-caps
        unelevated
        class="col rounded"
        size="md"
        color="primary"
        icon="edit"
        label="Редактор сообщения"
        @click="inline.openDialog('editor')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useInlineStore } from '../stores/inlineStore';
import { fetchMessage } from '../api/queries';

import TimerCard from 'src/components/timer/TimerCard.vue';

const inline = useInlineStore();

const text = computed(() => {
  return inline.message.text
    .split('\n')
    .map((item) => `<p>${item.trim() === '' ? '<br>' : item}</p>`)
    .join('');
});

const updateTime = (value: number, callback?: () => void) => {
  fetchMessage(
    'update-text',
    {
      message_id: inline.message.id,
      text: value.toString(),
    },
    (response) => {
      inline.message.text = response;
    }
  ).then(() => {
    if (callback !== void 0) callback();
  });
};
</script>

<style scoped lang="scss">
.editor-text {
  line-height: 1;
}
</style>
