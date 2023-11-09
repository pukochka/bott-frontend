<template>
  <q-dialog
    v-model="main.dialogs.create_question"
    position="top"
    persistent
    @before-show="update"
  >
    <q-card style="width: 100%">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Добавление вопроса</q-toolbar-title>

        <q-btn
          flat
          class="rounded"
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="q-pt-none row q-col-gutter-y-sm">
        <div
          class="col-12"
          v-for="(item, index) in config.questions"
          :key="index"
          @click="selected = item.id"
        >
          <q-item
            clickable
            v-ripple="{ color: 'primary' }"
            class="rounded fit bg-transition-300 q-pa-md"
            :class="[selected === item.id ? ' outline-2 bg-blue-1' : '']"
          >
            <q-item-section>
              <q-item-label class="text-subtitle1">
                {{ item.label }}
              </q-item-label>

              <q-item-label caption>{{ item.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none row justify-end q-gutter-x-sm">
        <q-btn
          class="rounded"
          flat
          size="md"
          label="Отмена"
          color="primary"
          v-close-popup
        />

        <q-btn
          unelevated
          class="rounded"
          size="md"
          label="Добавить"
          color="primary"
          :loading="loading"
          :disable="!selected"
          @click="addNewQuestion"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import config from '../../config';

import { ref } from 'vue';

import { fetchFeedback } from '../../api/feedback';

import { useFBStore } from '../../stores/FBStore';

const main = useFBStore();

const selected = ref(1);
const loading = ref(false);

const addNewQuestion = () => {
  if (selected.value === void 0) return;
  loading.value = true;
  fetchFeedback('create-input', { type: selected.value }).then(() => {
    loading.value = false;
    main.closeDialog('create_question');
  });
};

const update = () => {
  selected.value = 1;
};
</script>

<style lang="scss" scoped></style>
