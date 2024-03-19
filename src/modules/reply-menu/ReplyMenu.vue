<template>
  <q-card
    flat
    bordered
    class="rounded q-pa-md overflow-hidden"
    style="min-height: 250px"
  >
    <q-breadcrumbs>
      <q-breadcrumbs-el
        class="rounded q-px-xs"
        v-for="(breadcrumb, index) of breadcrumbs"
        :key="index"
        v-clickable="index !== breadcrumbs.length - 1"
        :label="breadcrumb.label"
        @click="breadcrumb.action"
      />
    </q-breadcrumbs>

    <div class="q-mb-md q-mt-sm">
      <div
        class="q-pa-xl rounded bg-grey-3 text-center text-weight-bold text-h5"
      >
        Чат
      </div>
    </div>

    <div class="q-gutter-y-sm relative-position">
      <input-section></input-section>

      <buttons-section
        :loading="loading.delete"
        :menu="reply.menu"
        @select-button="openSettings"
        @add-button="openAddButton"
        @delete-line="deleteLine"
      ></buttons-section>

      <div
        class="text-center q-pa-lg text-weight-bold text-h5"
        v-if="!reply.lines.length"
      >
        Кнопок пока нет...
      </div>

      <div class="">
        <div class="row justify-center">
          <q-btn
            unelevated
            dense
            no-wrap
            no-caps
            padding="4px 8px"
            color="primary"
            class="rounded col-12 col-sm-6"
            label="Добавить кнопку в новую линию"
            @click="AddButtonWithLine"
          >
            <q-tooltip
              class="bott-tooltip text-center"
              anchor="top middle"
              self="bottom middle"
            >
              Добавление кнопки в новую линию
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <q-inner-loading
      transition-show="none"
      transition-hide="fade"
      :showing="loading.start"
      class="bg-white"
    >
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-card>

  <draggable-dial :elements="reply.menu"></draggable-dial>

  <add-button></add-button>

  <button-settings></button-settings>

  <menu-settings></menu-settings>
</template>
<script lang="ts" setup>
import { config } from './config';
import { computed, onBeforeMount, ref } from 'vue';

import { useReplyStore } from './stores/replyStore';
import { useDialog } from 'src/utils/use/useDialog';
import { fetchMenu } from './api/queries';
import { historyGo } from 'src/utils/helpers/string';

import DraggableDial from './components/dialogs/DraggableDial.vue';
import AddButton from './components/dialogs/AddButton.vue';
import ButtonSettings from './components/dialogs/ButtonSettings.vue';
import MenuSettings from './components/dialogs/MenuSettings.vue';
import InputSection from './components/InputSection.vue';
import ButtonsSection from '../../components/inline/ButtonsSection.vue';

const reply = useReplyStore();

const loading = ref({
  start: false,
  delete: false,
});

const openAddButton = (id: number) => {
  reply.selectedLine = id;

  reply.openDialog('add_button');
};

const openSettings = (button: RMButton) => {
  reply.selectedButton = button;

  reply.openDialog('button_settings');
};

const deleteLine = (line: number) => {
  useDialog('Вы уверены, что хотите удалить линию?', true).onOk(() => {
    loading.value.delete = true;

    fetchMenu(
      'delete-line',
      { line_id: line },
      () => (loading.value.delete = true)
    );
  });
};

const AddButtonWithLine = () => {
  reply.selectedLine = null;

  reply.openDialog('add_button');
};

onBeforeMount(() => {
  loading.value.start = true;
  fetchMenu('view', undefined, () => (loading.value.start = false));
});

const breadcrumbs = computed(() => [
  {
    label: 'Панель управления',
    action: () => historyGo(`/shop/desktop/index?bot_id=${config.bot.id}`),
  },
  {
    label: 'Платные настройки',
    action: () => historyGo(`/lk/common/main/redirect?bot_id=${config.bot.id}`),
  },
  {
    label: 'Управление основным меню',
    action: '',
  },
]);
</script>

<style lang="scss"></style>
