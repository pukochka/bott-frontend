<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="reply.dialogs.main"
    @keydown="enterDown"
    @before-show="update"
  >
    <q-card style="width: 100%" class="dialog-rounded" bordered flat>
      <dialog-header label="Настройки меню"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          counter
          autofocus
          outlined
          v-model="text"
          :maxlength="64"
          class="bott-input--rounded"
          label="Поле для ввода"
        >
          <template #append>
            <emoji-menu @select="addEmoji"></emoji-menu>
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-item class="rounded" tag="label">
          <q-item-section>
            <q-item-label>Изменить размер кнопок</q-item-label>

            <q-item-label caption>Размер кнопок становится меньше</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-toggle color="primary" v-model="is_resize" />
          </q-item-section>
        </q-item>

        <q-item class="rounded" tag="label">
          <q-item-section>
            <q-item-label>Cкрывать меню после клика</q-item-label>

            <q-item-label caption>
              Нажатие по любой кнопке меню скроет его
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-toggle color="primary" v-model="is_close" />
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          flat
          no-caps
          class="rounded"
          size="md"
          color="red"
          label="Сбросить меню"
          @click="resetMenu"
        />

        <q-space></q-space>

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
          unelevated
          no-caps
          class="rounded"
          size="md"
          label="Сохранить"
          color="primary"
          :loading="loading"
          @click="updateMenu"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref } from 'vue';
import { useReplyStore } from '../../stores/replyStore';
import { fetchMenu } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';
import { historyGo } from '../../../inline/stores/helpers';

import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const reply = useReplyStore();
const text = ref('');
const is_resize = ref(false);
const is_close = ref(false);
const loading = ref(false);

const addEmoji = (value: string) => (text.value += value);

const updateMenu = () => {
  loading.value = true;

  fetchMenu('update', {
    input_field_placeholder: text.value,
    resize_keyboard: is_resize.value,
    one_time_keyboard: is_close.value,
  }).then(() => {
    reply.closeDialog('main');
    loading.value = false;
  });
};

const resetMenu = () => {
  useDialog('Вы уверены, что хотите сбросить меню?', true).onOk(() => {
    historyGo(
      `/lk/common/messages/reply-keyboard/reset?bot_id=${config.bot.id}`
    );
  });
};

const enterDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') updateMenu();
};

const update = () => {
  is_resize.value = reply.menu.resize_keyboard ?? false;
  is_close.value = reply.menu.one_time_keyboard ?? false;
  text.value = reply.menu.input_field_placeholder ?? '';
};
</script>

<style lang="scss" scoped></style>
