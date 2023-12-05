<template>
  <div class="relative-position" style="min-height: 380px">
    <transition name="fade">
      <div class="absolute-full" v-if="loading.start">
        <q-spinner size="80px" color="primary" class="absolute-center" />
      </div>
    </transition>

    <div class="row q-col-gutter-sm" v-show="!loading.start">
      <div class="col-12 col-sm-7 q-gutter-y-md">
        <q-card class="rounded q-pa-md q-gutter-y-sm" flat bordered>
          <div class="row items-center justify-between q-ma-none">
            <top-section></top-section>

            <file-manager
              v-if="[1, 3, 4, 5].includes(inline.message.type.id)"
              dialog
              :message="inline.message"
              :bot_id="inline.bot_id"
              :token="inline.token"
              :host="inline.host"
            ></file-manager>
          </div>

          <assigned-file
            v-if="[1, 3, 4, 5].includes(inline.message.type.id)"
          ></assigned-file>

          <message-content></message-content>
        </q-card>

        <buttons-section
          v-if="inline.inlineMenu && inline.inlineLines.length > 0"
          :menu="inline.inlineMenu"
          :loading="loading.delete"
          @select-button="openSettings"
          @add-button="addButtonInLine"
          @delete-line="deleteLine"
        ></buttons-section>

        <setting-section></setting-section>
      </div>

      <div class="col-12 col-sm-5 q-gutter-y-sm">
        <control-section></control-section>

        <inline-settings></inline-settings>

        <faq-section :faq="inline.message.faq"></faq-section>

        <constants-section
          :constants="inline.message.constants"
        ></constants-section>
      </div>
    </div>
  </div>

  <add-button></add-button>

  <editor-dial></editor-dial>

  <button-settings></button-settings>

  <edit-type-message></edit-type-message>

  <draggable-dial :elements="inline.inlineLines"></draggable-dial>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

import { fetchMenu, fetchMessage, fetchSettings } from './api/queries';
import { getQueryParam } from 'src/utils/helpers/string';

import { useInlineStore } from './stores/inlineStore';
import { useDialog } from '../file-manager/stores/useDialog';

import AddButton from './components/dialogs/AddButton.vue';
import ButtonSettings from './components/dialogs/ButtonSettings.vue';
import ButtonsSection from 'src/components/inline/ButtonsSection.vue';
import SettingSection from './components/SettingSection.vue';
import EditorDial from './components/dialogs/EditorDial.vue';
import DraggableDial from './components/dialogs/DraggableDial.vue';
import FileManager from '../file-manager/FileManager.vue';
import AssignedFile from './components/AssignedFile.vue';
import InlineSettings from './components/settings/InlineSettings.vue';
import EditTypeMessage from './components/dialogs/EditTypeMessage.vue';
import ConstantsSection from './components/settings/ConstantsSection.vue';
import FaqSection from './components/settings/FaqSection.vue';
import ControlSection from './components/settings/ControlSection.vue';
import TopSection from './components/TopSection.vue';
import MessageContent from './components/MessageContent.vue';

const props = withDefaults(defineProps<InlineMenuProps>(), {
  message: undefined,
  bot_id: 0,
  host: '',
  token: '',
});

const inline = useInlineStore();

const loading = ref({
  delete: false,
  start: true,
});

const openSettings = (button: IMButton) => {
  inline.selectedButton = button;
  inline.openDialog('button_settings');
};

const addButtonInLine = (line: number) => {
  inline.selectedLine = line;
  inline.openDialog('add_button');
};

const deleteLine = (line: number) => {
  inline.selectedLine = line;

  useDialog('Вы уверены, что хотите удалить линию?', true).onOk(() => {
    loading.value.delete = true;

    fetchMenu('delete-line', { line_id: inline?.selectedLine ?? 0 }).then(
      () => (loading.value.delete = false)
    );
  });
};

onBeforeMount(() => {
  windowProps();

  if (props.message) {
    inline.message = props.message;

    fetchSettings('settings', props.message.id).then(
      () => (loading.value.start = false)
    );

    return;
  }

  const message_id = Number(getQueryParam('id')) ?? 1;

  Promise.all([
    fetchMessage('get', { message_id: message_id }),
    fetchSettings('settings', message_id),
  ]).then(() => (loading.value.start = false));
});

const windowProps = () => {
  if (props.bot_id && props.token && props.host) {
    inline.bot_id = props.bot_id;
    inline.token = props.token;
    inline.host = props.host;

    return;
  }

  try {
    // inline.bot_id = bot.id;
    // inline.token = bot.token;
    // inline.host = host;
  } catch (e) {}
};

interface InlineMenuProps {
  message?: MessageFree | null;
  bot_id?: number;
  host?: string;
  token?: string;
}
</script>

<style lang="scss" scoped></style>
