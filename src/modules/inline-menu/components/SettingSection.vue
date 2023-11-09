<template>
  <div class="q-gutter-y-sm">
    <div class="" v-if="!inline.inlineLines.length && inline.inlineMenu">
      <q-item-label header class="text-center q-mb-md">
        Кнопок пока нет
      </q-item-label>

      <div class="row justify-center">
        <q-btn
          no-caps
          unelevated
          class="rounded col-12 col-md-6"
          size="md"
          color="primary"
          label="Добавить кнопку"
          @click="addButton"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm" v-if="inline.inlineLines.length">
      <div class="col-12 col-md-6">
        <q-btn
          no-caps
          unelevated
          class="rounded fit"
          size="md"
          color="primary"
          label="Добавить кнопку в новую линию"
          @click="addButton"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-btn
          no-caps
          unelevated
          class="rounded fit"
          size="md"
          color="primary"
          label="Расположение кнопок"
          @click="inline.openDialog('drag')"
        />
      </div>
    </div>

    <div class="row flex-center">
      <q-btn
        no-caps
        v-if="!inline.inlineMenu"
        unelevated
        class="col-12 col-md-6 rounded"
        size="md"
        color="green-7"
        icon="keyboard"
        label="Создать меню кнопок"
        :loading="loading.create"
        @click="createMenu"
      />

      <q-btn
        v-else
        no-caps
        unelevated
        class="col-12 col-md-6 rounded"
        size="md"
        color="red-7"
        icon="delete"
        label="Удалить меню"
        :loading="loading.delete"
        @click="deleteMenu"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useInlineStore } from '../stores/inlineStore';
import { fetchMessage } from '../api/queries';
import { useDialog } from '../../file-manager/stores/useDialog';

const inline = useInlineStore();

const loading = ref({
  delete: false,
  create: false,
});

const createMenu = () => {
  loading.value.create = true;

  fetchMessage('add-inline-menu', { message_id: inline.message.id }).then(
    () => (loading.value.create = false)
  );
};

const deleteMenu = () => {
  useDialog('Вы уверены, что хотите удалить меню?', true).onOk(() => {
    loading.value.delete = true;

    fetchMessage('delete-inline-menu', { message_id: inline.message.id }).then(
      () => (loading.value.delete = false)
    );
  });
};

const addButton = () => {
  inline.selectedLine = null;

  inline.openDialog('add_button');
};
</script>
