<template>
  <q-dialog
    v-model="main.dialogs.button_settings"
    position="bottom"
    no-esc-dismiss
    persistent
    no-shake
    @keydown="enterDown"
    @before-show="updateState"
  >
    <q-card style="width: 100%" class="dialog-rounded" bordered flat>
      <dialog-header label="Настройки кнопки"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          counter
          outlined
          autofocus
          label="Название кнопки"
          class="bott-input--rounded"
          v-model="text.value"
          :maxlength="text.max"
          :rules="[
            () => text.required || 'Введено неверное количество символов',
          ]"
        >
          <template #append>
            <emoji-menu @select="addEmoji"></emoji-menu>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-sm">
        <select-type
          :routes="config.routes"
          :webs="config.webs"
          :buttons="replyButtons"
          :types="replyTypes"
          :button="main.selectedButton"
          @update="update"
        ></select-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          flat
          no-caps
          class="rounded"
          size="md"
          label="Удалить"
          color="red"
          :loading="loading.delete"
          @click="deleteButton"
        />

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
          label="Изменить"
          color="primary"
          :disable="condition"
          :loading="loading.update"
          @click="updateButton"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import config from '../../config';
import { ref, computed } from 'vue';

import { fetchMenu } from '../../api/queries';
import { useMainStore } from '../../stores/mainStore';

import { replyTypes, replyButtons } from '../../stores/buttons';

import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import SelectType from 'src/components/select-type/SelectType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const text = ref({
  value: '',
  max: 64,
  min: 1,
  get required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const main = useMainStore();

const loading = ref({
  delete: false,
  update: false,
});
const route = ref<null | string>(null);
const type = ref(0);
const change = ref(false);

const state = ref({
  action: null,
  type: 0,
});

const condition = computed(() => route.value === null || !text.value.required);

const update = (value: any) => (state.value = value);

const addEmoji = (value: string) => (text.value.value += value);

const updateButton = () => {
  if (main.selectedButton?.type === 5) {
    /****/
  } else {
    loading.value.update = true;

    fetchMenu('update-data-and-type', {
      id: main.selectedButton?.id ?? 0,
      message: text.value.value,
      route: state.value.action ?? '',
      type: type.value,
    }).then(() => {
      loading.value.update = false;
      main.closeDialog('button_settings');
    });
  }
};

const deleteButton = () => {
  if (main.selectedButton?.type === 5) {
  } else {
    loading.value.delete = true;

    fetchMenu('delete-button', {
      id: main.selectedButton?.id ?? 0,
    }).then(() => {
      loading.value.delete = false;
      main.closeDialog('button_settings');
    });
  }
};

const enterDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter' && !condition.value) updateButton();
};

const updateState = () => {
  change.value = false;
  text.value.value = main.selectedButton?.text ?? '';
  type.value = main.selectedButton?.type ?? 0;
};
</script>

<style lang="scss" scoped></style>
