<template>
  <q-dialog v-model="data.uploadMenu" seamless @hide="updateHide">
    <q-card bordered flat style="width: 100%" class="rounded">
      <q-card-section class="row items-center justify-between q-pt-sm">
        <div class="text-h6">Загрузка файлов...</div>

        <q-btn flat round size="md" icon="close" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row justify-center q-gutter-x-sm q-pb-sm">
          <div class="">{{ data.uploadCount }} файл(ов)</div>

          <div class="">{{ data.uploadSize }} / {{ maxSize }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-scroll-area style="max-height: 280px; height: 140px">
          <div class="row q-col-gutter-sm">
            <upload-card
              v-for="(file, index) in data.uploadFiles"
              :key="index"
              :item="file"></upload-card>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="row q-col-gutter-x-sm q-pt-none">
        <div class="col">
          <q-btn
            no-caps
            dense
            unelevated
            class="rounded fit"
            size="md"
            color="red"
            label="Отмена"
            @click="data.uploadFiles = []"
            v-close-popup />
        </div>

        <div class="col">
          <q-btn
            no-caps
            dense
            unelevated
            class="rounded fit"
            size="md"
            color="primary"
            label="Загрузить"
            :loading="!!data.uploadStack.length"
            @click="upload" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { fetchFile } from '../../api/queries';
import { useFMStore } from '../../stores/FMStrore';

import UploadCard from '../UploadCard.vue';

const data = useFMStore();

const maxSize = computed(() => data.file_max_size.dimension());

const upload = () => {
  const str = 'base64,';
  data.uploadStack = data.uploadFiles.map((file) => file.id);

  data.uploadFiles.forEach((file) => {
    const index = file.result.indexOf(str);
    const image = file.result.slice(index + str.length);

    fetchFile(
      'main/upload',
      {
        name: file.name,
        file: image,
        path: data.paths,
      },
      () => {
        data.uploadStack = data.uploadStack.filter((item) => item !== file.id);

        if (!data.uploadStack.length) {
          fetchFile('index', undefined, () => {
            const data = useFMStore();
            data.uploadMenu = false;
          });
        }
      }
    );
  });
};

const updateHide = () => {
  data.uploadFiles = [];
  data.uploadStack = [];
};
</script>

<style scoped lang="scss"></style>
