<template>
  <q-btn
    v-if="props.dialog"
    flat
    dense
    no-caps
    class="rounded"
    color="primary"
    padding="2px 10px"
    icon="attach_file"
    :label="'Загрузить ' + btnText"
    @click="dialog = !dialog"
  />

  <q-dialog
    v-if="props.dialog"
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
import { computed, onBeforeMount, ref, watch } from 'vue';
import { defaultMessageFree } from '../inline-menu/stores/inlineModels';

import { fetchFile } from './api/queries';
import { useFMStore } from './stores/FMStrore';

import FileManagerCard from './FileManagerCard.vue';

const props = withDefaults(defineProps<FileManagerProps>(), {
  message: () => defaultMessageFree,
  dialog: false,
});

const dialog = ref(false);

const data = useFMStore();

const btnText = computed(() => text[data.query] ?? 'картинку');

const text: Record<any, string> = {
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

const updateShow = () => {
  fetchFile('index');
};

onBeforeMount(() => {
  data.message = props.message;
  data.dialog = props.dialog;
});

watch(
  () => props.message,
  () => (data.message = props.message),
  { deep: true }
);

interface FileManagerProps {
  message?: MessageFree;
  dialog: boolean;
}
</script>

<style lang="scss" scoped></style>
