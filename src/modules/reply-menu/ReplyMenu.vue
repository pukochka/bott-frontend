<template>
  <q-card flat bordered class="rounded q-pa-md">
    <div class="q-gutter-y-sm relative-position">
      <input-section></input-section>

      <buttons-section
        :menu="main.menu"
        @select="openSettings"
        @add-button="openAddButton"
        @delete="deleteLine"
      ></buttons-section>

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
  </q-card>

  <draggable-dial :elements="main.replyMenu"></draggable-dial>

  <add-button></add-button>

  <button-settings></button-settings>

  <menu-settings></menu-settings>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue';

import { useMainStore } from './stores/mainStore';
import { useDialog } from 'src/utils/use/useDialog';
import { fetchMenu } from './api/queries';

import DraggableDial from './components/dialogs/DraggableDial.vue';
import AddButton from './components/dialogs/AddButton.vue';
import ButtonSettings from './components/dialogs/ButtonSettings.vue';
import MenuSettings from './components/dialogs/MenuSettings.vue';
import InputSection from './components/InputSection.vue';
import ButtonsSection from '../../components/inline/ButtonsSection.vue';

const main = useMainStore();

const openAddButton = (line: RMLine) => {
  main.selectedLine = line;

  main.openDialog('add_button');
};

const openSettings = (button: RMButton) => {
  main.selectedButton = button;

  main.openDialog('button_settings');
};

const deleteLine = (line: RMLine) => {
  useDialog('Вы уверены, что хотите удалить линию?', true).onOk(() => {
    fetchMenu('delete-line', { line_id: line.id });
  });
};

const AddButtonWithLine = () => {
  main.selectedLine = null;

  main.openDialog('add_button');
};

onBeforeMount(() => {
  fetchMenu('view');
});
</script>

<style lang="scss"></style>
