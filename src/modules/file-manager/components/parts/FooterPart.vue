<template>
  <div
    class="relative-position"
    :style="{ height: height ? '70px' : 'auto' }"
    style="min-height: 36px"
  >
    <div
      class="row justify-center items-center q-px-sm q-py-xs q-gutter-x-sm"
      v-if="!data.loadings.index"
    >
      <q-btn
        flat
        class="rounded"
        padding="2px"
        size="md"
        color="primary"
        :disable="data.pagination.page === 1"
        :icon="button.icon"
        v-for="(button, index) of leftButtons"
        :key="index"
        @click="button.action"
      />

      <q-btn flat class="rounded" padding="2px">
        {{ data.pagination.page }} / {{ pageCount }}
        <q-menu class="bott-portal-menu" cover>
          <q-input
            class="bott-input--rounded"
            v-model="text"
            label="Номер страницы"
            outlined
            dense
            mask="#####"
          >
            <template #append>
              <q-btn
                flat
                dense
                class="rounded"
                size="md"
                color="primary"
                icon="check"
                @click="setPage"
                v-close-popup
              />
            </template>
          </q-input>
        </q-menu>
      </q-btn>

      <q-btn
        flat
        class="rounded"
        padding="2px"
        size="md"
        color="primary"
        :disable="data.pagination.page === pageCount"
        :icon="button.icon"
        v-for="(button, index) of rightButtons"
        :key="index"
        @click="button.action"
      />
    </div>

    <q-btn
      flat
      square
      no-caps
      size="md"
      :class="[height ? 'full-width' : '']"
      class="absolute-bottom-right"
      color="primary"
      label="Прикрепить к сообщению"
      :loading="loading"
      :disable="data.selectedFiles.length !== 1"
      @click="checkMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { defaultFileCard } from '../../stores/fileModels';

import { useFileStore } from '../../stores/fileStore';

import { fetchFile } from '../../api/queries';
import { useDialog } from '../../stores/useDialog';
import { useQuasar } from 'quasar';

const data = useFileStore();
const quasar = useQuasar();

const text = ref('');
const loading = ref(false);

const setPage = () => {
  const page = Number(text.value);

  if (page < 1 || page > pageCount.value) return;

  data.pagination.page = page;
};

const height = computed(() => quasar.screen.lt.sm);

const pageCount = computed(() =>
  Math.ceil(data.files.length / data.pagination.count) === 0
    ? 1
    : Math.ceil(data.files.length / data.pagination.count)
);

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
      link: file.link,
      id: data.message?.[path]?.id ?? 0,
    },
    () => {
      fetchFile('index', undefined, () => {
        useDialog('Успешно прикреплено!');

        if (data.dialog && data.message) {
          data.message[path].abs_path = file.link;
          data.message[path].host = file.name;
        }
      }).then(() => (loading.value = false));
    }
  );
};

const leftButtons = computed(() => [
  {
    icon: 'keyboard_double_arrow_left',
    action: () => (data.pagination.page = 1),
  },
  {
    icon: 'chevron_left',
    action: () => data.pagination.page--,
  },
]);

const rightButtons = computed(() => [
  {
    icon: 'chevron_right',
    action: () => data.pagination.page++,
  },
  {
    icon: 'keyboard_double_arrow_right',
    action: () => (data.pagination.page = pageCount.value),
  },
]);
</script>

<style scoped lang="scss"></style>
