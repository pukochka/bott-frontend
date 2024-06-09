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
        <EditorContent
          v-if="editor"
          class="relative-position"
          :editor="editor"
        />

        <div
          class="absolute-full z-top bg-opacity"
          v-if="state.link_state"
        ></div>

        <transition name="fade">
          <textarea
            v-model="state.code_content"
            class="bg-grey-8 text-grey-4 absolute-full rounded reset"
            v-if="state.code_state"
          >
          </textarea>
        </transition>
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
      <div class="">
        <q-btn
          unelevated
          dense
          class="rounded"
          padding="0 8px"
          color="primary"
          no-caps
          v-if="props['no-without-editor']"
          :href="`/lk/common/messages/main/old-browser?bot_id=${props.id}&id=${props.message_id}`"
          label="Редактировать без редактора"
        />
      </div>

      <q-item-label header class="q-py-none">
        {{ editor.storage.characterCount.characters() }} /
        {{ maxValue }}
      </q-item-label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, computed } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';

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

import { tgSpoiler } from './tgSpoiler';
import { codeMark } from './codeMark';

import EditorButtons from './EditorButtons.vue';
import { Blockquote } from './blockquote';

const props = withDefaults(defineProps<EditorProps>(), {
  id: 0,
  message_id: 0,
  maxValue: () => 1024,
  config: () => null,
  'no-without-editor': false,
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

const text = computed(() =>
  props.content
    .split('\n')
    .map((item) => `<p>${item}</p>`)
    .join('')
);

const editor = useEditor({
  content: text.value,
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
    Blockquote,
    tgSpoiler.configure({
      excludes: '',
    }),
    codeMark.configure({
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
  'no-without-editor'?: boolean;
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
