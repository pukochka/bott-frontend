<template>
  <div class="row q-gutter-sm items-center">
    <q-btn
      class="rounded"
      unelevated
      :flat="!button.active"
      padding="4px"
      color="primary"
      v-for="(button, index) in buttons"
      :key="index"
      :icon="button.icon"
      :id="button.id"
      :disable="button.disabled"
      @click="button.action"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        <div>{{ button.tooltip }}</div>
      </q-tooltip>
    </q-btn>

    <emoji-menu @select="addEmoji" editor></emoji-menu>
  </div>

  <q-menu
    persistent
    target="#link"
    class="rounded"
    max-width="400px"
    style="width: 100%"
    anchor="top middle"
    self="bottom middle"
    v-model="link_state"
  >
    <div class="q-pa-sm">
      <q-input
        dense
        borderless
        autofocus
        input-class="rounded q-px-md"
        label="Ссылка"
        v-model="link_input.value"
        hint="Пример ссылки: https://bot-t.com"
      >
      </q-input>

      <div class="row items-center justify-end q-gutter-x-sm q-mt-sm">
        <q-btn
          flat
          padding="4px"
          class="rounded"
          color="red"
          label="Отмена"
          v-close-popup
        />

        <q-btn
          unelevated
          padding="4px"
          class="rounded"
          color="primary"
          label="Применить"
          :disable="!link_input.required"
          @click="setLink"
        />
      </div>
    </div>
  </q-menu>

  <q-menu
    target="#paste"
    class="bott-portal-menu"
    max-width="250px"
    style="width: 100%"
    anchor="top middle"
    self="bottom middle"
  >
    <q-list dense bordered>
      <q-item clickable :active="format === 'text'" @click="format = 'text'">
        <q-item-section>Вставить текст (без форматирования)</q-item-section>
      </q-item>

      <q-item clickable :active="format === 'html'" @click="format = 'html'">
        <q-item-section>
          Вставить как HTML (только теги поддерживаемые Telegram)
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import { computed, PropType, ref, watch } from 'vue';

import EmojiMenu from '../emoji/EmojiMenu.vue';
import { mdiFormatQuoteClose, mdiContentPaste } from '@quasar/extras/mdi-v7';

const emit = defineEmits<{
  (e: 'update', value: any): void;
}>();

const props = defineProps({
  editor: Object as PropType<Editor>,
  linkRequired: Boolean,
});

const state = ref({
  code_state: false,
  code_content: '',
  link_state: false,
});

const format = ref<'text' | 'html'>('text');
const formatMenu = ref(false);
const link_state = ref(false);
const link_input = ref({
  value: 'https://',
  max: 64,
  min: 2,
  get required() {
    return this.value.length >= this.min;
  },
});

const addEmoji = (value: string) => props.editor?.commands.insertContent(value);

const setLink = () => {
  link_state.value = false;
  props.editor
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: link_input.value.value })
    .run();
  link_input.value.value = 'https://';
};

watch(
  state,
  () => {
    emit('update', state.value);
  },
  { deep: true }
);

const buttons = computed(
  (): Array<EditorButton> => [
    {
      tooltip: 'Жирный',
      icon: 'format_bold',
      action: () => props.editor?.chain().focus().toggleBold().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('bold'),
    },
    {
      tooltip: 'Курсив',
      icon: 'format_italic',
      action: () => props.editor?.chain().focus().toggleItalic().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('italic'),
    },
    {
      tooltip: 'Зачёркнутый',
      icon: 'format_strikethrough',
      action: () => props.editor?.chain().focus().toggleStrike().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('strike'),
    },
    {
      tooltip: 'Подчеркнутый',
      icon: 'format_underlined',
      action: () => props.editor?.chain().focus().toggleUnderline().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('underline'),
    },
    {
      id: 'link',
      tooltip: 'Создать ссылку',
      icon: 'link',
      action: () =>
        (link_input.value.value =
          props.editor?.getAttributes('link').href ?? link_input.value.value),
      disabled:
        (state.value.code_state || props.linkRequired) &&
        !props.editor?.isActive('link'),
      active: props.editor?.isActive('link'),
    },
    {
      tooltip: 'Исходный код',
      icon: 'code',
      action() {
        state.value.code_state = !state.value.code_state;
        let content = props.editor
          ?.getHTML()
          .replace(/<p>/gi, '')
          .replace(/<\/p>/gi, '<br>')
          .replace(/<p><\/p>/gi, '<br>');

        state.value.code_content = content ?? '';
      },
      disabled: false,
      active: state.value.code_state,
    },
    {
      tooltip: 'Код (Моношрифт-code)',
      icon: 'closed_caption',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action: () => props.editor?.chain().focus().toggleCodeMark().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('codeMark'),
    },
    {
      tooltip: 'Скрытый',
      icon: 'hide_source',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      action: () => props.editor?.chain().focus().toggleTgspoiler().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('tgSpoiler'),
    },
    {
      tooltip: 'Цитата',
      icon: mdiFormatQuoteClose,
      action: () => props.editor?.chain().focus().toggleBlockquote().run(),
      disabled: state.value.code_state,
      active: props.editor?.isActive('blockquote'),
    },
    {
      tooltip: 'Отменить действие',
      icon: 'undo',
      action: () => props.editor?.chain().focus().undo().run(),
      disabled: state.value.code_state,
      active: false,
    },
    {
      tooltip: 'Предыдущее действие',
      icon: 'redo',
      action: () => props.editor?.chain().focus().redo().run(),
      disabled: state.value.code_state,
      active: false,
    },
    {
      tooltip: 'Отменить выделенное форматирование',
      icon: 'close',
      action: () => {
        props.editor?.chain().focus().unsetAllMarks().run();
        props.editor?.chain().focus().unsetBlockquote().run();
      },
      disabled: state.value.code_state,
      active: false,
    },
    // {
    //   id: 'paste',
    //   tooltip: 'Формат вставки',
    //   icon: mdiContentPaste,
    //   action: () => (formatMenu.value = !formatMenu.value),
    //   disabled: state.value.code_state,
    //   active: false,
    // },
  ]
);

interface EditorButton {
  id?: string;
  tooltip: string;
  icon: string;
  action: () => void;
  disabled: boolean;
  active?: boolean;
}
</script>

<style lang="scss" scoped></style>
