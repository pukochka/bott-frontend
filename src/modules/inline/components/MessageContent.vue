<template>
  <div
    id="message"
    class="editor-text no-prosemirror text-body2"
    v-html="text"></div>

  <div class="row">
    <q-btn
      no-caps
      unelevated
      class="col rounded"
      size="md"
      color="primary"
      icon="edit"
      label="Редактор сообщения"
      @click="inline.openDialog('editor')" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useInlineStore } from '../stores/inlineStore';

const inline = useInlineStore();

const text = computed(() => {
  return inline.message.text
    .split('\n')
    .map((item) => `<p>${item.trim() === '' ? '<br>' : item}</p>`)
    .join('');
});
</script>

<style scoped lang="scss">
.editor-text {
  line-height: 1;
}
</style>
