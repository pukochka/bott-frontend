<template>
  <q-dialog
    v-model="reply.dialogs.button_settings"
    position="bottom"
    no-esc-dismiss
    persistent
    no-shake
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
          :bot_id="config.bot.id"
          :token="config.bot.token"
          :host="config.host"
          :webs="config.webs"
          :buttons="replyButtons"
          :types="replyTypes"
          :button="reply.selectedButton"
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
          :loading="loading['delete-button']"
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
          :loading="loading['update-data-and-type']"
          @click="updateButton"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref, computed } from 'vue';

import { fetchMenu } from '../../api/queries';
import { useReplyStore } from '../../stores/replyStore';

import { replyTypes, replyButtons } from '../../utils/buttons';

import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import SelectType from 'src/components/select-type/SelectType.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { useDialog } from '../../../file-manager/stores/useDialog';

const text = ref({
  value: '',
  max: 64,
  min: 1,
  get required() {
    return this.max > this.value.length && this.min < this.value.length;
  },
});

const reply = useReplyStore();

const loading = ref({
  'delete-button': false,
  'update-data-and-type': false,
});
const type = ref(0);
const change = ref(false);

const state = ref({
  action: null,
  type: 0,
});

const condition = computed(
  () =>
    (state.value.type === 5 ? false : state.value.action === null) ||
    !text.value.required
);

const update = (value: any) => (state.value = value);

const addEmoji = (value: string) => (text.value.value += value);

const request = (query: 'delete-button' | 'update-data-and-type') => {
  loading.value[query] = true;

  fetchMenu(query, {
    id: reply.selectedButton?.id ?? 0,
    message: text.value.value,
    route: state.value.action ?? '',
    type: state.value.type,
  }).then(() => {
    loading.value[query] = false;
    reply.closeDialog('button_settings');
  });
};

const updateButton = () => {
  if (reply.selectedButton?.type === 5) {
    useDialog(
      'Вы уверены, что хотите изменить кнопку со сценарием? При изменении типа кнопки, сценарий связанный с кнопкой удалиться.',
      true
    ).onOk(() => request('update-data-and-type'));

    return;
  }

  request('update-data-and-type');
};

const deleteButton = () => {
  useDialog('Вы уверены, что хотите удалить кнопку?', true).onOk(() =>
    request('delete-button')
  );

  return;
};

const updateState = () => {
  change.value = false;
  text.value.value = reply.selectedButton?.text ?? '';
  type.value = reply.selectedButton?.type ?? 0;
};
</script>

<style lang="scss" scoped></style>
