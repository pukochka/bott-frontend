<template>
  <q-btn
    v-if="config.dialog"
    flat
    padding="2px 10px"
    no-caps
    class="rounded"
    size="md"
    color="primary"
    :label="'Загрузить ' + btnText"
    @click="dialog = !dialog"
  />

  <q-dialog
    v-if="config.dialog"
    v-model="dialog"
    full-width
    class="rounded"
    @hide="updateManager"
    @before-show="updateShow"
  >
    <file-manager-card></file-manager-card>
  </q-dialog>

  <file-manager-card update v-else></file-manager-card>
</template>

<script lang="ts" setup>
import { config } from './config';

import { computed, ref } from 'vue';

import { fetchFile } from './api/queries';
import { useFMStore } from './stores/FMStrore';

import FileManagerCard from './FileManagerCard.vue';

const dialog = ref(false);

const data = useFMStore();

const btnText = computed(
  () => text[config.value.query] ?? 'Загрузить картинку'
);

const text = {
  photos: 'картинку',
  files: 'файл',
  animations: 'анимацию',
  videos: 'видео',
};

const updateManager = () => {
  data.usersFiles = [];
  data.selectedFiles = [];
  data.drawerInfo = true;
};

const updateShow = () => fetchFile('index');
</script>

<style lang="scss" scoped></style>
