<template>
  <q-dialog
    full-width
    persistent
    position="bottom"
    v-model="inline.dialogs.editor"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card
        flat
        bordered
        class="rounded dialog-rounded bott-dialog__responsive"
      >
        <dialog-header label="Изменение текста сообщения"></dialog-header>

        <q-card-section class="q-pt-none">
          <editor-content
            :id="inline.bot_id"
            :message_id="inline.message.id"
            :content="inline.message.text"
            :max-value="inline.message.text_length"
            @update="updateText"
          ></editor-content>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-end q-gutter-sm">
          <q-btn
            no-caps
            flat
            class="rounded"
            size="md"
            label="Отмена"
            color="primary"
            v-close-popup
          />

          <q-btn
            no-caps
            unelevated
            class="rounded"
            size="md"
            label="Сохранить"
            color="primary"
            :loading="loading"
            @click="saveText"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';

import { fetchMessage } from '../../api/queries';
import { encodeText } from '../../stores/helpers';

import EditorContent from 'src/components/editor/EditorContent.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const inline = useInlineStore();

const loading = ref(false);

const text = ref('');

const updateText = (value: string) => (text.value = value);

const saveText = () => {
  loading.value = true;

  const content = encodeText(text.value);

  fetchMessage(
    'update-text',
    {
      message_id: inline.message.id,
      text: content,
    },
    () => {
      inline.message.text = content ?? inline.message.text;
    }
  ).then(() => {
    loading.value = false;
    inline.closeDialog('editor');
  });
};

const updateShow = () => {
  text.value = inline.message.text;
};
</script>

<style lang="scss" scoped></style>
