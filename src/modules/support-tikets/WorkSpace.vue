<template>
  <div class="fit q-py-sm relative-position">
    <!--    <div class="bott-page__title q-px-md q-py-lg">Категории вопросов</div>-->

    <!--    <q-breadcrumbs class="q-pa-md text-subtitle2">-->
    <!--      <q-breadcrumbs-el label="Home" />-->
    <!--      <q-breadcrumbs-el label="Components" />-->
    <!--      <q-breadcrumbs-el label="Breadcrumbs" />-->
    <!--    </q-breadcrumbs>-->

    <div class="row">
      <header-section></header-section>

      <q-separator inset class="col-12" />

      <top-section class="col-12"></top-section>

      <main-section class="col-12"></main-section>

      <bottom-section class="col-12"></bottom-section>
    </div>

    <transition name="q-transition--fade">
      <chat-section v-if="work.chat" style="z-index: 10"></chat-section>
    </transition>
  </div>

  <transfer-ticket></transfer-ticket>

  <executor-transfer></executor-transfer>

  <edit-ticket></edit-ticket>

  <select-category></select-category>
</template>

<script setup lang="ts">
import { useWorkStore } from './stores/workStore';

import HeaderSection from './components/sections/HeaderSection.vue';
import MainSection from './components/sections/MainSection.vue';
import BottomSection from './components/sections/BottomSection.vue';
import TopSection from './components/sections/TopSection.vue';
import ChatSection from './components/chat/ChatSpace.vue';
import TransferTicket from './components/dialogs/TransferTicket.vue';
import EditTicket from './components/dialogs/EditTicket.vue';
import ExecutorTransfer from './components/dialogs/ExecutorTransfer.vue';
import SelectCategory from './components/dialogs/SelectCategory.vue';

const work = useWorkStore();
</script>

<style scoped lang="scss"></style>
