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
import { defaultMessageFree } from '../inline/stores/inlineModels';

import { fetchFile } from './api/queries';
import { useFileStore } from './stores/fileStore';

import FileManagerCard from './FileManagerCard.vue';
import { config } from './config';

const props = withDefaults(defineProps<FileManagerProps>(), {
  message: () => defaultMessageFree,
  dialog: false,
  bot_id: 0,
  host: '',
  token: '',
});

const dialog = ref(false);

const data = useFileStore();

const btnText = computed(
  () => text[data.message?.type.path ?? 'photos'] ?? 'картинку'
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

const updateShow = () => {
  fetchFile('index');
};

onBeforeMount(() => {
  if (props.bot_id === 0 || props.bot_id === void 0) {
    data.dialog = false;
    data.host = config.host;
    data.bot_id = config.bot.id;
    data.token = config.bot.token;
    data.message = config.message;

    fetchFile('index');

    return;
  }

  data.message = props.message;
  data.dialog = props.dialog;
  data.bot_id = props.bot_id ?? 0;
  data.token = props.token ?? '';
  data.host = props.host ?? '';
});

watch(
  () => props.message,
  () => (data.message = props.message),
  { deep: true }
);

interface FileManagerProps {
  message?: MessageFree;
  dialog: boolean;
  bot_id?: number;
  host?: string;
  token?: string;
}
</script>

<style lang="scss" scoped></style>
