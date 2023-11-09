<template>
  <div class="q-gutter-y-sm">
    <div class="rounded overflow-hidden q-pa-xs">
      <div class="q-pb-xs">
        <editor-buttons
          v-if="editor"
          :editor="editor"
          :link-required="is_link"
          @update="updateState"
        ></editor-buttons>
      </div>

      <div class="relative-position bordered rounded q-pa-sm">
        <EditorContent class="relative-position" :editor="editor" />

        <div
          class="absolute-full z-top bg-opacity"
          v-if="state.link_state"
        ></div>

        <Transition name="fade">
          <textarea
            v-model="state.code_content"
            class="bg-grey-8 text-grey-4 absolute-full rounded reset"
            v-if="state.code_state"
          >
          </textarea>
        </Transition>
      </div>
    </div>

    <div
      v-if="editor"
      class="row items-center justify-between"
      :class="[
        editor.storage.characterCount.characters() === maxValue
          ? ' text-negative'
          : '',
      ]"
    >
      <q-btn
        unelevated
        dense
        class="rounded"
        padding="0 8px"
        color="primary"
        no-caps
        :href="`/lk/common/messages/main/old-browser?bot_id=${props.id}&id=${props.message_id}`"
        :label="t('edit-text-in-editor')"
      />

      <q-item-label header class="q-py-none">
        {{ editor.storage.characterCount.characters() }} /
        {{ maxValue }}
      </q-item-label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { t } from 'src/boot/lang';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';

import { TGSpoiler } from './TGSpoiler';
import { CodeMark } from './CodeMark';

import EditorButtons from './EditorButtons.vue';

const props = withDefaults(defineProps<EditorProps>(), {
  id: 0,
  message_id: 0,
  maxValue: () => 1024,
  config: () => null,
});

const emit = defineEmits<{
  (e: 'update', value: string): void;
}>();

const state = ref({
  code_state: false,
  code_content: '',
  link_state: false,
});

const is_link = ref(false);

const editor = useEditor({
  content: '',
  injectCSS: true,
  extensions: [
    Document.configure({
      excludes: '',
    }),
    Paragraph,
    Text.configure({
      excludes: '',
    }),
    Bold,
    Italic,
    Strike,
    Underline,
    History,
    TGSpoiler.configure({
      excludes: '',
    }),
    CodeMark.configure({
      excludes: '',
      code: true,
    }),
    Link.configure({
      HTMLAttributes: {
        target: '',
      },
    }),
    CharacterCount.configure({
      limit: props.maxValue,
    }),
  ],
  onCreate: (state) => {
    state.editor.commands.insertContent(
      props.content.replace('<p><p>', '').replace('<p></p>', '')
    );
  },
  onUpdate: (state) => {
    emit('update', state.editor.getHTML());
  },
  onTransaction: (state) => {
    is_link.value =
      state.editor.view.state.selection.ranges[0]?.$from ===
      state.editor.view.state.selection.ranges[0]?.$to;
  },
});

const updateState = (value: any) => {
  state.value = value;
};

onBeforeUnmount(() => editor.value?.destroy());

interface EditorProps {
  content: string;
  id: number;
  message_id: number;
  maxValue?: number;
}
</script>

<style lang="scss" scoped>
.reset {
  outline: 0;
  border: 0;
  padding: 8px;
}
.bg-opacity {
  background: var(--q-primary);
  opacity: 0.6;
}
</style>
