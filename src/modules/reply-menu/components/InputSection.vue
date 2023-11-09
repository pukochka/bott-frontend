<template>
  <div class="row items-center q-gutter-x-sm">
    <div v-if="size_sm">
      <q-fab
        style="z-index: 10"
        unelevated
        v-model="fab"
        label="Настройки"
        color="primary"
        icon="keyboard_arrow_up"
        direction="up"
        padding="4px"
        class="rounded"
        vertical-actions-align="left"
      >
        <q-fab-action
          padding="5px"
          color="primary"
          label="Настройки меню"
          @click="main.openDialog('main')"
        />

        <q-fab-action
          padding="5px"
          color="primary"
          label="Расположение кнопок"
          @click="main.openDialog('drag')"
        />
      </q-fab>
    </div>

    <q-btn
      unelevated
      dense
      no-caps
      no-wrap
      padding="4px 8px"
      color="primary"
      class="rounded"
      label="Настройки меню"
      v-if="!size_sm"
      @click="main.openDialog('main')"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Насторойки всего меню
      </q-tooltip>
    </q-btn>

    <div class="col-grow ellipsis">{{ placeholder }}</div>

    <q-btn
      unelevated
      dense
      no-caps
      no-wrap
      padding="4px 8px"
      color="primary"
      class="rounded"
      label="Расположение кнопок"
      v-if="!size_sm"
      @click="main.openDialog('drag')"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Настройки положения кнопок
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useQuasar } from 'quasar';
import { useMainStore } from '../stores/mainStore';

const fab = ref(false);

const quasar = useQuasar();
const main = useMainStore();

const size_sm = computed(() => quasar.screen.lt.sm);

const placeholder = computed(
  () => main.replyMenu?.input_field_placeholder ?? 'Пусто'
);
</script>

<style lang="scss" scoped></style>
