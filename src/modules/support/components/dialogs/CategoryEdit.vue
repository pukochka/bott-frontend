<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="support.dialogs.category_edit"
    @before-show="updateShow"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive" bordered flat>
        <dialog-header label="Редактирование категории"></dialog-header>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            counter
            v-model="text"
            :maxlength="48"
            :rules="[
              (val) =>
                val.length >= 1 || 'Введено неверное количество символов',
            ]"
            label="Название категории"
            class="bott-input--rounded"
          >
            <template #append>
              <q-btn
                no-caps
                flat
                size="md"
                color="primary"
                icon="check"
                class="rounded"
                :loading="loading.title"
                :disable="text.length < 1"
                @click="updateTitle"
              >
                <q-tooltip
                  class="bott-tooltip text-center"
                  anchor="top middle"
                  self="bottom middle"
                >
                  Изменить
                </q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <inline-menu
            v-if="!loading.message"
            no-breadcrumbs
            :host="config.host"
            :bot_id="config.bot.id"
            :token="config.bot.token"
            :message="message"
          ></inline-menu>
        </q-card-section>

        <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
          <q-btn
            no-caps
            flat
            size="md"
            class="rounded"
            color="primary"
            label="Закрыть"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import { fetchMessage, fetchSupportCategory } from '../../api/queries';
import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import InlineMenu from '../../../inline/InlineMenu.vue';

const support = useSupportStore();

const text = ref('');
const message = ref(defaultMessage);
const loading = ref({
  title: false,
  message: true,
});

const updateTitle = () => {
  loading.value.title = true;

  fetchSupportCategory(
    'update-title',
    {
      category_id: support.selectedCategory?.id ?? -1,
      title: text.value,
    },
    (response) => {
      if (support.selectedCategory) {
        support.selectedCategory.title = response;
      }
    }
  ).then(() => (loading.value.title = false));
};

const updateShow = () => {
  loading.value.message = true;
  text.value = support.selectedCategory?.title ?? '';

  fetchMessage(
    'get',
    {
      message_id: support.selectedCategory?.view_category_id ?? -1,
    },
    (response) => {
      message.value = response;
    }
  ).then(() => (loading.value.message = false));
};
</script>

<style scoped lang="scss"></style>
