<template>
  <q-header bordered class="text-weight-bold bott-header" height-hint="50">
    <bott-mobile-menu v-if="smBr"></bott-mobile-menu>

    <q-toolbar class="q-py-sm bott-header">
      <q-btn
        v-if="mdBr"
        flat
        dense
        icon="menu"
        size="14px"
        class="rounded header-btn"
        aria-label="Menu"
        @click="states.toggleDrawer"
      />

      <q-toolbar-title
        class="text-uppercase row items-center"
        :class="[smBr ? ' justify-center' : '']"
      >
        <bott-logo></bott-logo>
      </q-toolbar-title>

      <q-btn-dropdown
        flat
        padding="4px 8px"
        class="rounded header-btn"
        content-class="bott-portal-menu"
        :label="i18n.locale.value"
      >
        <q-list class="text-size-14 text-weight-bold" dense separator>
          <q-item
            clickable
            v-close-popup
            v-for="(l, index) of lang"
            :key="index"
            @click="changeLang(l)"
          >
            <q-item-section>
              <q-item-label class="text-center">{{ l }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <bott-header-menu v-if="smBr === false"></bott-header-menu>

      <q-btn
        v-for="(button, index) of buttons"
        :key="index"
        flat
        padding="4px 8px"
        class="rounded header-btn"
        v-show="button.visible"
        :icon="button.icon"
        @click="button.action"
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import {
  mdiCompare,
  mdiDotsVertical,
  mdiFolderInformation,
} from '@quasar/extras/mdi-v6';

import { useQuasar } from 'quasar';
import { useStatesStore } from 'stores/states/statesStore';
import { useStyleStore } from 'stores/style/styleStore';

import BottLogo from 'layouts/sections/BottLogo.vue';
import BottHeaderMenu from 'layouts/sections/menu/BottHeaderMenu.vue';
import BottMobileMenu from 'layouts/sections/menu/BottMobileMenu.vue';

import { changeLang } from '../../boot/lang';
import { useI18n } from 'vue-i18n';

const lang: Array<'ru' | 'en' | 'es'> = ['ru', 'en', 'es'];

const style = useStyleStore();
const states = useStatesStore();
const quasar = useQuasar();
const i18n = useI18n();

const mdBr = computed(() => quasar.screen.lt.md);
const smBr = computed(() => quasar.screen.lt.sm);

const buttons = computed(() => [
  {
    icon: mdiCompare,
    visible: true,
    action: style.toggleTheme,
  },
  {
    icon: mdiDotsVertical,
    visible: smBr.value,
    action: states.toggleMenu,
  },
  {
    icon: mdiFolderInformation,
    visible: mdBr.value,
    action: states.toggleToc,
  },
]);
</script>

<style lang="scss" scoped></style>
