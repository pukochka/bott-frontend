<template>
  <div class="row q-px-sm q-py-xs q-gutter-x-xs">
    <div class="" v-for="(action, index) of leftActions" :key="index">
      <q-btn
        v-if="action.visible"
        flat
        no-caps
        dense
        class="rounded"
        :color="action.color"
        :icon="action.icon"
        :label="!sm ? action.label : ''"
        :disable="action.disabled"
        :loading="action.loading"
        @click="action.action"
      ></q-btn>
    </div>

    <q-space></q-space>

    <q-btn flat class="rounded" dense color="primary" icon="search">
      <q-menu cover class="bott-portal-menu">
        <q-input
          dense
          class="bott-input--rounded"
          v-model="data.search"
          color="primary"
          outlined
        >
          <template #append>
            <q-btn
              dense
              flat
              size="md"
              color="primary"
              icon="close"
              v-if="data.search !== ''"
              @click="data.search = ''"
            />
          </template>
        </q-input>
      </q-menu>
    </q-btn>

    <q-btn flat class="rounded" dense color="primary" icon="tune">
      <tune-menu></tune-menu>
    </q-btn>

    <q-btn
      flat
      no-caps
      class="rounded"
      dense
      color="primary"
      icon="upload"
      label="Загрузить"
      @click="openExplorer"
    >
      <input
        multiple
        ref="uploadFiles"
        type="file"
        class="upload-input"
        :accept="data.extensions"
        @change="data.loadFiles"
      />
    </q-btn>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { defaultFileCard } from '../../stores/fileModels';

import { fetchFile } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';

import { useFileStore } from '../../stores/fileStore';

import TuneMenu from '../sections/TuneMenu.vue';
import { useQuasar } from 'quasar';

const data = useFileStore();
const quasar = useQuasar();

const uploadFiles = ref<any>(null);
const loading = ref(false);

const sm = computed(() => quasar.screen.lt.sm);

const openExplorer = () => {
  uploadFiles.value?.click();
};

const openInfo = () => {
  data.selectedFile = data.selectedFiles[0];

  data.drawerInfo = !data.drawerInfo;
};

const download = () => {
  data.selectedFiles.forEach((file) => {
    const link = document.createElement('a');
    link.href = file.link;
    link.style.display = 'none';

    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
  });
};

const disableFilter = () => {
  data.tabs = 'all';
  data.sortable.date = null;
  data.sortable.size = null;
};

const checkMessage = () => {
  const name = data.selectedFiles[0].name;
  const ext = name.slice(name.lastIndexOf('.') + 1);

  if (data.paths === 'video' && ext !== 'mp4') {
    useDialog(
      'Видео не в формате mp4, будет отправлено документом. Вы уверены, что хотите отправить видео документом?',
      true
    ).onOk(assignMessage);

    return;
  }

  assignMessage();
};

const assignMessage = () => {
  const file = data.selectedFiles[0] ?? defaultFileCard;
  const path = data.message?.type.path ?? 'photos';

  loading.value = true;

  fetchFile(
    'assign',
    {
      link: data.selectedFiles[0]?.link ?? '',
      id: data.message?.[path]?.id ?? 0,
    },
    () => {
      fetchFile('index', undefined, () => {
        data.showTooltipAttach(file.name);

        if (data.dialog && data.message) {
          data.message[path]['abs_path'] = file.link;
          data.message[path]['host'] = file.name;
        }
      });
    }
  ).then(() => (loading.value = false));
};

const leftActions = computed(() => [
  {
    label: 'Скачать',
    color: 'primary',
    icon: 'download',
    loading: false,
    action: download,
    disabled: data.selectedFiles.length !== 1,
    visible: true,
  },
  {
    label: 'Сведения',
    color: 'primary',
    icon: 'info',
    loading: false,
    action: openInfo,
    disabled: data.selectedFiles.length !== 1,
    visible: true,
  },
  {
    label: 'Прикрепить',
    color: 'primary',
    icon: 'mms',
    loading: loading.value,
    action: checkMessage,
    disabled: data.selectedFiles.length !== 1,
    visible: true,
  },
  {
    label: 'Удалить',
    color: 'red',
    icon: 'close',
    loading: data.loadings.all,
    action: data.deleteSelected,
    disabled: !data.selectedFiles.length,
    visible: true,
  },
  {
    label: 'Убрать фильтрацию',
    color: 'primary',
    icon: 'filter_alt_off',
    loading: false,
    action: disableFilter,
    disabled: false,
    visible:
      data.tabs !== 'all' ||
      data.sortable.size !== null ||
      data.sortable.date !== null,
  },
]);
</script>
<style scoped lang="scss">
.upload-input {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  visibility: hidden;
  opacity: 0;
}
</style>
