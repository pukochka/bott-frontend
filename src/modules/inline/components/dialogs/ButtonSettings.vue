<template>
  <q-dialog
    v-model="inline.dialogs.button_settings"
    position="bottom"
    persistent
    @keydown="enterDown"
  >
    <q-card style="width: 100%" flat bordered class="rounded dialog-rounded">
      <dialog-header label="Настройки кнопки"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          class="bott-input--rounded"
          v-model="text.value"
          label="Название кнопки"
          outlined
          autofocus
          :maxlength="text.max"
          counter
          :rules="[
            () => text.required || 'Введено неверное количество символов',
          ]"
        >
          <template #append>
            <emoji-menu @select="addEmoji"></emoji-menu>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <select-type
          static
          :bot_id="inline.bot_id"
          :token="inline.token"
          :message_id="inline.message.id"
          :host="inline.host"
          :webs="config.webs"
          :button="inline.selectedButton"
          :buttons="inlineButtons"
          :types="inlineTypes"
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

import { computed, onBeforeUpdate, ref } from 'vue';

import { fetchMenu } from '../../api/queries';

import { useInlineStore } from '../../stores/inlineStore';

import { inlineButtons, inlineTypes } from '../../stores/buttons';

import SelectType from 'src/components/select-type/SelectType.vue';
import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const inline = useInlineStore();

const loading = ref({
  delete: false,
  update: false,
});

const state = ref<{ action: string | null; type: number }>({
  action: null,
  type: 0,
});

const text = ref({
  value: '',
  max: 64,
  min: 2,
  get required() {
    return this.max >= this.value.length && this.min <= this.value.length;
  },
});

const condition = computed(
  () => text.value.required === false || state.value.action === null
);

const update = (value: any) => (state.value = value);

const addEmoji = (value: string) => (text.value.value += value);

const deleteButton = () => {
  loading.value.delete = true;

  fetchMenu('delete-button', { id: inline.selectedButton?.id ?? 0 }).then(
    () => {
      loading.value.delete = false;
      inline.closeDialog('button_settings');
    }
  );
};

const updateButton = () => {
  loading.value.update = true;

  fetchMenu('update-data-and-type', {
    id: inline.selectedButton?.id ?? 0,
    text: text.value.value,
    type: state.value.type,
    action: state.value.action ?? '',
  }).then(() => {
    loading.value.update = false;
    inline.closeDialog('button_settings');
  });
};

const enterDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter' && text.value.required) updateButton();
};

onBeforeUpdate(() => {
  text.value.value = inline.selectedButton?.text ?? '';
  state.value.type = inline.selectedButton?.type ?? 0;
  state.value.action = inline.selectedButton?.action ?? null;
});
</script>

<style lang="scss" scoped></style>
