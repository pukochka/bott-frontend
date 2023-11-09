<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="main.dialogs.main"
    @keydown="enterDown"
    @before-show="update"
  >
    <q-card style="width: 100%" class="dialog-rounded" bordered flat>
      <dialog-header label="Настройки меню"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          counter
          maxlength="64"
          autofocus
          v-model="text"
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
import { ref } from 'vue';
import { useMainStore } from '../../stores/mainStore';
import { fetchMenu } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';

import EmojiMenu from 'src/components/emoji/EmojiMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const main = useMainStore();
const text = ref('');
const is_resize = ref(false);
const is_close = ref(false);
const loading = ref(false);

const updateMenu = () => {
  loading.value = true;

  fetchMenu('update', {
    input_field_placeholder: text.value,
    resize_keyboard: is_resize.value,
    one_time_keyboard: is_close.value,
  }).then(() => {
    main.closeDialog('main');
    loading.value = false;
  });
};

const resetMenu = () => {
  useDialog('Вы уверены, что хотите сбросить меню?', true).onOk(() => {
    // fetchMenu('delete', { line_id: line.id });
  });
};

const enterDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') updateMenu();
};

const update = () => {
  is_resize.value = main.replyMenu?.resize_keyboard ?? false;
  is_close.value = main.replyMenu?.one_time_keyboard ?? false;
  text.value = main.replyMenu?.input_field_placeholder ?? '';
};
</script>

<style lang="scss" scoped></style>
