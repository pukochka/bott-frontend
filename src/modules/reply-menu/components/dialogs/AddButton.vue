<template>
  <q-dialog
    v-model="main.dialogs.add_button"
    position="bottom"
    persistent
    no-shake
    @keydown="enterDown"
    @before-show="updateState"
  >
    <q-card style="width: 100%" class="dialog-rounded" bordered flat>
      <dialog-header label="Добавление кнопки"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-input
          autofocus
          counter
          outlined
          class="bott-input--rounded"
          label="Название кнопки"
          :maxlength="text.max"
          v-model="text.value"
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
          :button="null"
          @update="update"
        ></select-type>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          no-caps
          flat
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
          :loading="loading"
          :disable="condition"
          @click="addButton"
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

const main = useMainStore();

const route = ref<string | null>(null);
const type = ref(0);
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
  () => route.value === null || text.value.required === false
);

const addEmoji = (value: string) => (text.value.value += value);

const update = (value: any) => (state.value = value);

const addButton = () => {
  loading.value = true;

  if (main.selectedLine) {
    fetchMenu('add-button-in-line', {
      route: state.value.action ?? '',
      message: text.value.value,
      line_id: main.selectedLine.id,
      type: state.value.type,
    }).then(() => {
      loading.value = false;
      main.closeDialog('add_button');
    });

    return;
  }

  fetchMenu('add-button-with-line', {
    route: state.value.action ?? '',
    message: text.value.value,
    type: state.value.type,
  }).then(() => {
    loading.value = false;
    main.closeDialog('add_button');
  });
};

const enterDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter' && !condition.value) addButton();
};

const updateState = () => {
  text.value.value = '';
  type.value = 0;
};
</script>
