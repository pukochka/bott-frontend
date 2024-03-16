<template>
  <q-card
    flat
    bordered
    class="rounded"
    style="max-width: 1200px"
    :style="data.dialog ? 'max-height: 60vh;' : 'height:60vh; width:100%'"
    :class="[data.dialog ? 'fit' : '']"
  >
    <q-layout container view="hHh Lpr lff" class="bott-layout__drawer">
      <q-header reveal bordered class="bg-card">
        <transition
          :name="
            data.attach.tooltip
              ? 'q-transition--slide-right'
              : 'q-transition--slide-left'
          "
        >
          <q-card
            flat
            bordered
            class="rounded absolute-top-left q-pa-sm q-ma-md z-fab"
            v-if="data.attach.tooltip"
          >
            <div class="row q-gutter-x-md">
              <div class="text-positive text-subtitle1">
                {{ data.attach.name }} прикреплён!
              </div>

              <q-btn
                flat
                size="sm"
                icon="close"
                padding="4px"
                class="rounded"
              />
            </div>
          </q-card>
        </transition>

        <div class="q-pa-xs row items-center">
          <div class="q-pl-sm" v-if="data.loaded">
            {{ data.loadCount }} файл(ов)
          </div>

          <div class="q-pl-sm" v-if="data.loaded">
            {{ data.employed }} / {{ data.allow }}
          </div>

          <q-space></q-space>

          <q-btn
            flat
            class="rounded"
            padding="2px"
            icon="close"
            color="primary"
            v-close-popup
            v-if="data.dialog"
          />
        </div>

        <q-separator />

        <actions-section></actions-section>
      </q-header>

      <drawer-info></drawer-info>

      <q-page-container>
        <q-page>
          <main-part></main-part>
        </q-page>
      </q-page-container>

      <q-footer reveal bordered class="bg-card">
        <footer-part></footer-part>
      </q-footer>
    </q-layout>

    <upload-menu></upload-menu>
  </q-card>
</template>

<script setup lang="ts">
import { useFileStore } from './stores/fileStore';

import ActionsSection from './components/parts/HeaderPart.vue';
import UploadMenu from './components/sections/UploadMenu.vue';
import MainPart from './components/parts/MainPart.vue';
import FooterPart from './components/parts/FooterPart.vue';
import DrawerInfo from './components/parts/DrawerInfo.vue';

const data = useFileStore();
</script>

<style scoped lang="scss"></style>
