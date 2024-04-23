<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="inline.dialogs.combine"
  >
    <div class="row justify-center">
      <q-card flat bordered class="bott-dialog__responsive dialog-rounded">
        <dialog-header label="Совместить сообщение"></dialog-header>

        <q-card-section class="q-pt-none" style="min-height: 200px">
          <combine-pagination
            :message="inline.message"
            :host="inline.host"
            :bot_id="inline.bot_id"
            :token="inline.token"
            @set-next-message="setNextMessage"
          ></combine-pagination>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
          <q-btn
            flat
            no-caps
            class="rounded"
            size="md"
            label="Закрыть"
            color="primary"
            v-close-popup
          />

          <q-btn
            no-caps
            unelevated
            class="rounded"
            size="md"
            label="Добавить"
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { fetchMessage } from '../../api/queries';
import { useInlineStore } from '../../stores/inlineStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

import CombinePagination from 'src/components/inline/combine/CombinePagination.vue';

const inline = useInlineStore();

const setNextMessage = (next_id: number, callback?: () => void) => {
  fetchMessage('set-next-message', {
    message_id: inline.message.id,
    message_next_id: next_id,
  }).then(() => (callback !== void 0 ? callback() : false));
};
</script>

<style scoped lang="scss"></style>
