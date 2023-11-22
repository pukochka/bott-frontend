<template>
  <q-card
    flat
    bordered
    style="max-height: 600px"
    class="rounded overflow-hidden">
    <div class="q-pa-xs row items-center" style="min-height: 29px">
      <div class="q-pl-sm" v-show="!data.loadings.index">
        {{ data.loadCount }} файл(ов)
      </div>

      <div class="q-pl-sm" v-show="!data.loadings.index">
        {{ maxSize }} / {{ data.allow }}
      </div>

      <q-space></q-space>

      <q-btn
        flat
        class="rounded"
        padding="2px"
        icon="close"
        v-close-popup
        v-if="data.dialog" />
    </div>

    <q-separator />

    <actions-section></actions-section>

    <q-separator />

    <q-layout
      view="hHh Lpr lff"
      container
      style="min-height: 390px"
      class="bott-layout__drawer">
      <drawer-info></drawer-info>

      <q-page-container>
        <q-page class="q-pa-sm" style="min-height: 390px">
          <main-part></main-part>
        </q-page>
      </q-page-container>
    </q-layout>

    <q-separator />

    <footer-part></footer-part>

    <upload-menu></upload-menu>
  </q-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';

import { useFMStore } from './stores/FMStrore';

import { fetchFile } from './api/queries';

import ActionsSection from './components/parts/HeaderPart.vue';
import UploadMenu from './components/sections/UploadMenu.vue';
import MainPart from './components/parts/MainPart.vue';
import FooterPart from './components/parts/FooterPart.vue';
import DrawerInfo from './components/parts/DrawerInfo.vue';

const props = withDefaults(defineProps<FileManagerCardProp>(), {
  update: false,
});

const data = useFMStore();

const maxSize = computed(() => data.employed);

onBeforeMount(() => {
  if (props.update) fetchFile('index');
});

interface FileManagerCardProp {
  update?: boolean;
}
</script>

<style scoped lang="scss"></style>
