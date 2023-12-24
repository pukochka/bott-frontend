<template>
  <div class="fit q-py-sm relative-position" style="min-height: inherit">
    <div class="bott-page__title q-px-md q-py-lg">Категории вопросов</div>

    <q-breadcrumbs class="q-pa-md text-subtitle2">
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Components" />
      <q-breadcrumbs-el label="Breadcrumbs" />
    </q-breadcrumbs>

    <div class="overflow-hidden">
      <header-section></header-section>

      <q-separator inset />

      <top-section></top-section>

      <main-section></main-section>

      <bottom-section></bottom-section>
    </div>

    <transition name="q-transition--fade">
      <chat-section v-if="work.chat" style="z-index: 10"></chat-section>
    </transition>
  </div>
</template>

<script setup lang="ts">
import HeaderSection from './components/sections/HeaderSection.vue';
import MainSection from './components/sections/MainSection.vue';
import BottomSection from './components/sections/BottomSection.vue';
import TopSection from './components/sections/TopSection.vue';
import ChatSection from './components/chat/ChatSpace.vue';
import { useWorkStore } from './stores/workStore';

const work = useWorkStore();
</script>

<style scoped lang="scss"></style>
