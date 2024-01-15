<template>
  <div class="row items-center no-wrap" style="max-width: 48%">
    <q-item-label class="text-body1 ellipsis text-weight-bold">
      {{ inline.message.title }}
    </q-item-label>

    <q-btn
      flat
      class="rounded q-ml-xs"
      padding="2px"
      size="13px"
      color="primary"
      icon="edit">
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle">
        Изменить название
      </q-tooltip>

      <q-menu
        cover
        class="bott-portal-menu"
        v-model="menu"
        @before-show="updateText">
        <q-input
          autofocus
          outlined
          maxlength="64"
          v-model="text.value"
          label="Название сообщения"
          class="bott-input--rounded">
          <template #append>
            <q-btn
              flat
              class="rounded"
              padding="2px"
              size="13px"
              color="primary"
              icon="check"
              :disable="!text.required"
              :loading="loading"
              @click="updateTitle" />
          </template>
        </q-input>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useInlineStore } from '../stores/inlineStore';
import { fetchMessage } from '../api/queries';

const inline = useInlineStore();

const text = ref({
  value: '',
  min: 2,
  get required() {
    return this.value.length >= this.min;
  },
});
const menu = ref(false);
const loading = ref(false);

const updateText = () => {
  text.value.value = inline.message.title;
};

const updateTitle = () => {
  loading.value = true;

  fetchMessage('update-title', {
    message_id: inline.message.id,
    title: text.value.value,
  }).then(() => {
    loading.value = false;
    menu.value = false;
  });
};
</script>

<style scoped lang="scss"></style>
