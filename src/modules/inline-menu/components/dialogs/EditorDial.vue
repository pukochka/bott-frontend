<template>
  <q-dialog
    full-width
    persistent
    position="bottom"
    v-model="inline.dialogs.editor"
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
            :id="config.bot.id"
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
import config from '../../config';

import { ref } from 'vue';

import { useInlineStore } from '../../stores/inlineStore';

import { fetchMessage } from '../../api/queries';
import { encodeText } from '../../stores/helpers';

import EditorContent from 'src/components/editor/EditorContent.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const inline = useInlineStore();

const loading = ref(false);

const text = ref(inline.message.text);

const updateText = (value: string) => (text.value = value);

const saveText = () => {
  loading.value = true;

  fetchMessage(
    'update-text',
    {
      message_id: inline.message.id,
      text: encodeText(text.value),
    },
    () => {
      inline.message.text = text.value ?? inline.message.text;
      setTimeout(
        () =>
          (document.querySelector('.editor-text')!.innerHTML = document
            .querySelector('.editor-text')!
            .innerHTML.replace(/<p><\/p>/gi, '<br>')),
        30
      );
    }
  ).then(() => {
    loading.value = false;
    inline.closeDialog('editor');
  });
};
</script>

<style lang="scss" scoped></style>
