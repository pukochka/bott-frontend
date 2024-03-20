<template>
  <div class="relative-position" style="min-height: 380px">
    <q-inner-loading :showing="loading.start" class="rounded">
      <q-spinner size="80px" color="primary" />
    </q-inner-loading>

    <div class="row q-col-gutter-sm" v-show="!loading.start">
      <div class="col-12 col-sm-7 q-gutter-y-md">
        <q-card
          flat
          bordered
          class="rounded q-gutter-y-sm"
          :class="[condition ? ' q-px-md q-pb-md' : ' q-pa-md']"
        >
          <q-breadcrumbs v-if="condition" gutter="none" align="left">
            <q-breadcrumbs-el
              class="rounded q-px-xs"
              v-clickable="index !== breadcrumbs.length - 1"
              :label="breadcrumb.label"
              :href="breadcrumb.link"
              v-for="(breadcrumb, index) of breadcrumbs"
              :key="index"
            />
          </q-breadcrumbs>

          <div class="row items-center justify-between no-wrap q-ma-none">
            <top-section></top-section>

            <file-manager
              dialog
              :message="inline.message"
              :bot_id="inline.bot_id"
              :token="inline.token"
              :host="inline.host"
              v-if="[1, 3, 4, 5].includes(inline.message.type.id)"
            ></file-manager>
          </div>

          <assigned-media :message="inline.message"></assigned-media>

          <content-section></content-section>
        </q-card>

        <buttons-section
          v-if="inline.menu && inline.lines.length > 0"
          :menu="inline.menu"
          :loading="loading.delete"
          :is_support_menu="inline.message.is_support_menu"
          @select-button="openSettings"
          @add-button="addButtonInLine"
          @delete-line="deleteLine"
        ></buttons-section>

        <bottom-section
          v-if="inline.message.is_support_menu"
          @drop-combine="(id) => emit('drop-combine', id)"
        ></bottom-section>
      </div>

      <div class="col-12 col-sm-5 q-gutter-y-sm">
        <right-section :loading="loading.start"></right-section>
      </div>
    </div>
  </div>

  <button-add-modal></button-add-modal>

  <button-settings-modal></button-settings-modal>

  <update-type-modal></update-type-modal>

  <combine-modal></combine-modal>

  <editor-modal></editor-modal>

  <draggable-modal :elements="inline.lines"></draggable-modal>
</template>
<script lang="ts" setup>
import { config } from './config';
import { computed, onBeforeMount, ref } from 'vue';

import { fetchMenu, fetchMessage, fetchSettings } from './api/queries';
import { getQueryParam } from 'src/utils/helpers/string';

import { useInlineStore } from './stores/inlineStore';
import { useDialog } from 'src/utils/use/useDialog';

import EditorModal from './components/modals/EditorModal.vue';
import ButtonAddModal from './components/modals/ButtonAddModal.vue';
import ButtonSettingsModal from './components/modals/ButtonSettingsModal.vue';
import UpdateTypeModal from './components/modals/UpdateTypeModal.vue';
import DraggableModal from './components/modals/DraggableModal.vue';
import CombineModal from './components/modals/CombineModal.vue';
import TopSection from './components/TopSection.vue';
import ContentSection from './components/ContentSection.vue';
import BottomSection from './components/BottomSection.vue';
import FileManager from '../file-manager/FileManager.vue';
import ButtonsSection from 'src/components/inline/ButtonsSection.vue';
import AssignedMedia from 'src/components/file-manager/AssignedMedia.vue';
import RightSection from './components/RightSection.vue';

const props = withDefaults(defineProps<InlineMenuProps>(), {
  message: undefined,
  bot_id: 0,
  host: '',
  token: '',
  noBreadcrumbs: false,
  scenarios: false,
});

const emit = defineEmits<{
  (e: 'drop-combine', id: number): void;
}>();

const inline = useInlineStore();

const loading = ref({
  delete: false,
  start: true,
});

const condition = computed(() => !props.noBreadcrumbs);

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

    fetchMenu(
      'delete-line',
      { line_id: inline?.selectedLine ?? 0 },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => (loading.value.delete = false));
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

  const message_id = Number(getQueryParam('id')) || 1;

  Promise.all([
    fetchMessage('get', { message_id: message_id }),
    fetchSettings('settings', message_id),
  ]).then(() => (loading.value.start = false));
});

const breadcrumbs = computed(() => inline.message.breadcrumbs?.crumbs ?? []);

const windowProps = () => {
  if (props.bot_id && props.token && props.host) {
    inline.bot_id = props.bot_id;
    inline.token = props.token;
    inline.host = props.host;
    inline.scenarios = props.scenarios;

    return;
  }

  try {
    inline.bot_id = config.bot.id;
    inline.token = config.bot.token;
    inline.host = config.host;
    inline.scenarios = false;
  } catch (e) {}
};

interface InlineMenuProps {
  message?: MessageFree | null;
  bot_id?: number;
  host?: string;
  token?: string;
  noBreadcrumbs?: boolean;
  scenarios?: boolean;
}
</script>

<style lang="scss" scoped></style>
