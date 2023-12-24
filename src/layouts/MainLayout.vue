<template>
  <q-layout view="hHh LpR lFf">
    <bott-header></bott-header>

    <q-drawer
      v-if="mdBr"
      overlay
      v-model="states.drawer"
      bordered
      behavior="mobile"
      :width="251"
    >
      <div class="row justify-end q-pa-sm">
        <q-btn
          dense
          flat
          size="md"
          color="red"
          icon="close"
          class="rounded"
          @click="states.toggleDrawer"
        />
      </div>

      <bott-drawer style="height: calc(100% - 100px)"></bott-drawer>
    </q-drawer>

    <q-drawer
      v-if="mdBr"
      overlay
      v-model="states.toc"
      bordered
      side="right"
      behavior="mobile"
      :width="251"
    >
      <div class="row justify-end q-pa-sm">
        <q-btn
          dense
          flat
          size="md"
          color="red"
          icon="close"
          class="rounded"
          @click="states.toggleToc"
        />
      </div>

      <bott-toc style="height: calc(100% - 100px)"></bott-toc>
    </q-drawer>

    <q-page-container>
      <q-page class="bott-page__layout">
        <div
          class="row justify-start no-wrap fit relative-position"
          :class="[visible ? ' active' : '']"
          style="min-height: inherit"
        >
          <div
            :class="[
              footer
                ? ' bott-drawer__container-slide bott-header'
                : ' bott-drawer__container',
            ]"
            class="bott-menu-container row justify-center transition"
            v-if="mdBr === false"
          >
            <bott-drawer
              class="q-pt-md fit"
              :without-footer="footer"
              @enter="enterDrawer"
            ></bott-drawer>
          </div>

          <div v-if="footer && !mdBr" class="padding-left-60"></div>

          <router-view></router-view>

          <div
            v-if="!footer && mdBr === false"
            class="bott-drawer__container row justify-center col-grow"
            :class="[!viewToc ? ' bott-menu__toc' : '']"
          >
            <bott-toc
              style="width: 270px; min-height: inherit; height: 100%"
            ></bott-toc>
          </div>
        </div>

        <bott-footer v-if="!footer"></bott-footer>
      </q-page>
    </q-page-container>

    <q-page-scroller class="">
      <q-btn fab-mini class="z-notify" color="orange" :icon="mdiArrowUp" />
    </q-page-scroller>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useQuasar } from 'quasar';
import { useStatesStore } from 'stores/states/statesStore';

import BottHeader from 'layouts/sections/BottHeader.vue';
import BottFooter from 'layouts/sections/BottFooter.vue';
import BottDrawer from 'layouts/sections/BottDrawer.vue';
import BottToc from 'layouts/sections/BottToc.vue';

import { mdiArrowUp } from '@quasar/extras/mdi-v7';

const states = useStatesStore();
const quasar = useQuasar();

const onDrawer = ref(false);

const mdBr = computed(() => quasar.screen.lt.md);

const viewToc = computed(() => (states.props.toc ?? []).length);
const footer = computed(() => states.props.withoutFooter ?? false);

const visible = computed(() => !onDrawer.value && states.props.withoutFooter);

const enterDrawer = (value: boolean) => {
  onDrawer.value = value;
};
</script>

<style lang="scss" scoped>
.padding-left-60 {
  margin-left: 60px;
}
</style>
