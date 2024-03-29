<template>
  <q-dialog
    v-model="inline.dialogs.add_button"
    position="bottom"
    persistent
    @before-show="updateState"
  >
    <q-card style="width: 100%" flat bordered class="rounded dialog-rounded">
      <dialog-header label="Добавление кнопки"></dialog-header>

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
          :bot_id="inline.bot_id"
          :token="inline.token"
          :host="inline.host"
          :message_id="inline.message.id"
          :webs="config.webs"
          :buttons="inlineButtons"
          :types="inlineTypes"
          :button="null"
          @update="update"
        ></select-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
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
          label="Добавить"
          color="primary"
          :disable="condition"
          :loading="loading"
          @click="addButton"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, ref } from 'vue';

import { fetchMenu } from '../../api/queries';
import { useInlineStore } from '../../stores/inlineStore';

import { inlineButtons, inlineTypes } from '../../stores/buttons';

import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import SelectType from 'src/components/select-type/SelectType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const inline = useInlineStore();

const loading = ref(false);

const state = ref({
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

const addButton = () => {
  loading.value = true;

  if (inline.selectedLine !== null) {
    fetchMenu(
      'add-button-in-line',
      {
        text: text.value.value,
        type: state.value.type,
        line_id: inline.selectedLine,
        action: state.value.action ?? '',
      },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => {
      loading.value = false;
      inline.closeDialog('add_button');
    });

    return;
  }

  fetchMenu(
    'add-button-with-line',
    {
      text: text.value.value,
      type: state.value.type,
      action: state.value.action ?? '',
    },
    (response) => {
      inline.message.menu = response;
    }
  ).then(() => {
    loading.value = false;
    inline.closeDialog('add_button');
  });
};

const updateState = () => {
  text.value.value = '';
  state.value.type = 0;
  state.value.action = null;
};
</script>

<style lang="scss" scoped></style>
